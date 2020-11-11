'use strict'

module.exports = {
  /*
    Trasactions
    @param: transRef(required)
  */
  getbyRef: {
    method: 'GET',
    path: '/paymentrequest/{:transRef}',
    send_json: false,
    params: null,
    route_params: { transRef: String }
  }
}