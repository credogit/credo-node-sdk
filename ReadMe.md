# Credo

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

A NodeJS Wrapper for [Credo](https://www.credo.com)

## Overview

This project provides an easy-to-use object-oriented API to consume endpoints on Credo. For more information, visit https://developers.credo.co/reference for API documentation

## Getting Started

>Install from the NPM Registry
```bash
	$ npm i --save credo-node
```

# Usage

```js


let Credo = require('credo-node')

let API_KEY = ""
let API_KEY_SECRET = ""

const environment = process.env.NODE_ENV

const credo = new Credo(API_KEY, environment)

let initiate = await credo.initiatePayments({
  amount: 100,
  currency: "NGN",
  redirectUrl: "https://mywebsites.com/callback",
  transRef: "string",
  paymentOptions: "CARD,BANK,USSD",
  customerEmail: "customer@something.com",
  customerName: "John Doe",
  customerPhoneNo: "+234 813 000 000"
})
console.log(initiate)


//Verify a transaction direct_charge
let verifyTransaction = await credo.verifyTransaction({
  transRef: "ref:11111"
})
console.log(verifyTransaction)

let verifyCardNumber = await credo.verifyCardNumber({
  orderCurrency: "NGN", 
  paymentSlug:"pIEiYn8xxxxxxxxxxxxx", 
  cardNumber: "4242424242424242"
})
console.log(verifyCardNumber)

let cardThirdParty = await credo.cardThirdParty({
  orderCurrency: "NGN", 
  paymentSlug:"pIEiYn8xxxxxxxxxxxxx", 
  cardNumber: "4242424242424242"
})
console.log(cardThirdParty)

let pay = await credo.pay({
  orderCurrency: "NGN", 
  paymentSlug:"pIEiYn8xxxxxxxxxxxxx", 
  cardNumber: "4242424242424242"
})
console.log(pay)


```

## API Resources

>Each method expects an object literal with both **route parameters** and **request parameters (query / body)**. Please, go through the _src/endpoints_ folder to see the specific items that should make up the object literal for each method.

- Payments
  - credo.initiatePayments()
  - credo.cardThirdParty()
  - credo.verifyCardNumber()
  - credo.pay()

- Transactions
  - credo.verifyTransaction()


# License

MIT

# Credits


[npm-image]: https://img.shields.io/npm/v/paystack-node.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/credo-node

[travis-image]: https://img.shields.io/travis/stitchng/paystack/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/github/Moses-Bassey/Credo-node
