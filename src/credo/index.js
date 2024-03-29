'use strict'

const got = require('got')
const querystring = require('querystring')
const _ = require('lodash')
const payments = require('../endpoints/payments.js')
const transactions = require('../endpoints/transactions.js')

/* Any param with '$' at the end is a REQUIRED param both for request body param(s) and request route params */
const apiEndpoints = Object.assign(
  {},
  payments,
  transactions
)

/*!
 *
 * Provides a convenience extension to _.isEmpty which allows for
 * determining an object as being empty based on either the default
 * implementation or by evaluating each property to undefined, in
 * which case the object is considered empty.
 */

 /*!
 *
 * Provides a convenience extension to _.isEmpty which allows for
 * determining an object as being empty based on either the default
 * implementation or by evaluating each property to undefined, in
 * which case the object is considered empty.
 */
_.mixin(function () {
  // reference the original implementation
  var _isEmpty = _.isEmpty
  return {
    // If defined is true, and value is an object, object is considered
    // to be empty if all properties are undefined, otherwise the default
    // implementation is invoked.
    isEmpty: function (value, defined) {
      if (defined && _.isObject(value)) {
        return !_.some(value, function (value, key) {
          return value !== undefined
        })
      }
      return _isEmpty(value)
    }
  }
}())

const isLiteralFalsey = (variable) => {
  return (variable === '' || variable === false || variable === 0)
}

const checkTypeName = (target, type) => {
  let typeName = ''
  if (isLiteralFalsey(target)) {
    typeName = (typeof target)
  } else {
    typeName = ('' + (target && target.constructor.name))
  }
  return !!(typeName.toLowerCase().indexOf(type) + 1)
}

const isTypeOf = (value, type) => {
  let result = false

  type = type || []

  if (typeof type === 'object') {
    if (typeof type.length !== 'number') {
      return result
    }

    let bitPiece = 0
    type = [].slice.call(type)

    type.forEach(_type => {
      if (typeof _type === 'function') {
        _type = (_type.name || _type.displayName).toLowerCase()
      }
      bitPiece |= (1 * (checkTypeName(value, _type)))
    })

    result = !!(bitPiece)
  } else {
    if (typeof type === 'function') {
      type = (type.name || type.displayName).toLowerCase()
    }

    result = checkTypeName(value, type)
  }

  return result
}

const isNullOrUndefined = (value) => {
  return isTypeOf(value, ['undefined', 'null'])
}

const isNumeric = (value) => {
  if (isTypeOf(value, ['string', 'number'])) {
    return isTypeOf(Math.abs(-value), 'number')
  }
  return false
}

const setPathName = (config, values) => {

  if(typeof values !== 'object') {
    throw new Error('stuff');
  }
  let urlString = config.path;

  Object.entries(values).forEach(([ key, value ]) => {
    urlString = urlString.replace(`{${key}}`, value);
  });
  
  return urlString;
}

const _jsonify = (data) => {
  return isNullOrUndefined(data) ? 'null'
    : (typeof data === 'object'
      ? (data instanceof Date ? data.toISOString().replace(/Z$/, '') : (('toJSON' in data) ? data.toJSON().replace(/Z$/, '') : JSON.stringify(data)))
      : String(data))
}

const setInputValues = (config, inputs) => {
  let httpReqOptions = {}
  let inputValues = {}
  let label = ''

  switch (config.method) {
    case 'GET':
    case 'HEAD':
    case 'DELETE':
      label = 'query'
      break

    case 'POST':
    case 'PUT':
    case 'PATCH':
      label = 'body'
      break
  }

  httpReqOptions[label] = {}

  if (config.param_defaults) {
    inputs = Object.assign({}, config.param_defaults, inputs)
  }
  
  for (var input in config.params) {

    if (config.params.hasOwnProperty(input)) {
      let param = input.replace('$', '')
      let _input = inputs[param]
      let _type = config.params[input]
      let _required = false

      if ((input.indexOf('$') + 1) === (input.length)) {
        _required = true
      }

      if (isNullOrUndefined(_input) || _input === '') {
        if (_required) { throw new Error(`param: "${param}" is required but not provided; please provide as needed`) }
      } else {
        httpReqOptions[label][param] = isTypeOf(_input, _type)
          ? (label === 'query'
            ? querystring.escape(_jsonify(_input))
            : _jsonify(_input))
          : null

        if (httpReqOptions[label][param] === null) {
          throw new Error(`param: "${param}" is not of type ${_type.name || _type}; please provided as needed`)
        }
      }
    }
  }

  inputValues[label] = (label === 'body'
    ? (config.send_form
      ? httpReqOptions[label]
      : JSON.stringify(httpReqOptions[label])
    )
    : querystring.stringify(httpReqOptions[label]))

  return inputValues
}

const makeMethod = function (config) {
  let httpConfig = {
    headers: {
      'Cache-Control': 'no-cache',
      'Accept': 'application/json'
    },
    //json: true
  }

  if (config.send_json) {
    httpConfig.headers['Content-Type'] = httpConfig.headers['Accept'] // 'application/json'
    //httpConfig.form = false
  } else if (config.send_form) {
    httpConfig.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    //httpConfig.form = true
  }

  return function (requestParams = {}) {
    let pathname = config.path
    let payload = false
    
    if (!(requestParams instanceof Object)) {
      throw new TypeError('Argument: [ requestParam(s) ] Should Be An Object Literal')
    }

    if (!_.isEmpty(requestParams, true)) {
      if (config.params !== null) {
        payload = setInputValues(config, requestParams)
      }

      if (config.route_params !== null) {
        pathname = setPathName(config, requestParams)
      }
    } else {
      if (config.params !== null || config.route_params !== null) {
        throw new TypeError('Argument: [ requestParam(s) ] Not Meant To Be Empty!')
      }
    }

    if (payload === false) {
      payload = {}
    }

    for (let type in payload) {
      if (payload.hasOwnProperty(type)) {
        httpConfig[type] = (type === 'query') ? payload[type] : JSON.parse(payload[type])
      }
    }

    let reqVerb = config.method.toLowerCase()
    httpConfig.body = JSON.stringify(httpConfig.body);

    return this.httpBaseClient[reqVerb](this.httpClientBaseOptions.baseUrl + pathname, httpConfig)
  }
}

class Credo {
  constructor (apiKey, appEnv = 'development') {
    const environment = /^(?:development|local|dev)$/

    this.api_base = {
      sandbox: 'https://credo-payments.nugitech.com/v1',
      live: 'https://credo-payments.nugitech.com/v1'
    }

    this.httpClientBaseOptions = {
      baseUrl: environment.test(appEnv) ? this.api_base.sandbox : this.api_base.live,
      headers: {
        'Authorization': `${apiKey}`
      },
      hooks: {
        beforeResponse: [
          async options => {
            // console.log(options)
          }
        ],
        onError: [
          error => {
            const { response } = error
            if (response && response.body) {
              error.name = 'CredoError'
              error.message = `${response.body.message} (${error.statusCode})`
            }

            return error
          }
        ],
        afterResponse: [
          (response, retryWithMergedOptions) => {
            let errorMessage = ''
            switch (response.statusCode) {
              case 400: // Bad Request
                errorMessage = 'Request was badly formed | Bad Request (400)'
                break
              case 401: // Unauthorized
                errorMessage = 'Bearer Authorization header may not have been set | Unauthorized (401)'
                break
              case 404: // Not Found
                errorMessage = 'Request endpoint does not exist | Not Found (404)'
                break
              case 403: // Forbidden
                errorMessage = 'Request endpoint requires further priviledges to be accessed | Forbidden (403)'
                break
            }

            if (response.body && response.body.status === false) {
              errorMessage += '; ' + response.body.message
            }

            if (errorMessage !== '') {
              // console.error('Credo Error: ', errorMessage);
              throw new Error(errorMessage)
            }

            return response
          }
        ]
      },
      mutableDefaults: false
    }
    this.httpBaseClient = got.extend(this.httpClientBaseOptions)
  }

  mergeNewOptions (newOptions) {
    this.httpBaseClient = this.httpBaseClient.extend(
      newOptions
    )
  }
}

for (let methodName in apiEndpoints) {
  if (apiEndpoints.hasOwnProperty(methodName)) {
    Credo.prototype[methodName] = makeMethod(apiEndpoints[methodName])
  }
}

module.exports = Credo
