# Credo

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

A NodeJS Wrapper for [Credo](https://www.credo.com)

## Overview

This project provides an easy-to-use object-oriented API to consume endpoints on Credo. For more information, visit https://developers.credo.co/reference for API documentation

## Getting Started

>Install from the NPM Registry
```bash
	$ npm i --save paystack-node
```

# Usage

```js

let Credo = require('credo')

let API_KEY = ""

const environment = process.env.NODE_ENV

const credo = new Credo(APIKEY, environment)

let payment = await credo.initiatePayments({
  amount: 100,
  currency: "NGN",
  redirectUrl: "https://mywebsites.com/callback",
  transRef: "string",
  paymentOptions: "CARD,BANK,USSD",
  customerEmail: "customer@something.com",
  customerName: "John Doe",
  customerPhoneNo: "+234 813 000 000"
})

if(payment)
	//do payments here
else
	//throw error here

```

## API Resources

>Each method expects an object literal with both **route parameters** and **request parameters (query / body)**. Please, go through the _src/endpoints_ folder to see the specific items that should make up the object literal for each method

- Payments
  - credo.initiatePayments()
  - credo.cardThirdParty()
  - credo.verifyCardNumber()
  - credo.pay()

- Transactions
  - credo.getbyRef()


# License

MIT

# Credits


[npm-image]: https://img.shields.io/endpoint?logo=npm
[npm-url]: https://www.npmjs.com/package/credo-node

[travis-image]: https://img.shields.io/travis/stitchng/paystack/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/github/Moses-Bassey/Credo-node