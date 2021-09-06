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


let Credo = require('credo')

let API_KEY = ""
let API_KEY_SECRET = ""

const environment = process.env.NODE_ENV

const credo = new Credo(API_KEY, environment)

credo.initiatePayments({
  amount: 100,
  currency: "NGN",
  redirectUrl: "https://mywebsites.com/callback",
  transRef: "string",
  paymentOptions: "CARD,BANK,USSD",
  customerEmail: "customer@something.com",
  customerName: "John Doe",
  customerPhoneNo: "+23481300000"
}).then(data => {
  console.log(data)
})


//Verify a transaction direct_charge
credo.verifyTransaction({
  transRef: "ref:11111"
})


credo.thirdPartyPay({
  expiryMonth: "01", 
  securityCode: "111", 
  expiryYear: "22", 
  orderAmount: 1000, 
  orderCurrency: "NGN", 
  transRef: "748rbri4823ruoqedb9h435", 
  cardNumber: "4242424242424242", 
  customerEmail: "acompany@something.com", 
  customerName: "John Doe", 
  customerPhoneNo: "09000000000"
}).then(data => {
  console.log(data)
}, err => {
  console.log(err)
})



credo.pay({
  amount: 1000, 
  currency: "NGN", 
  transRef: "748389842939e3", 
  paymentOptions: "CARD", 
  customerEmail: "acompany@something.com", 
  customerName: "John Doe", 
  redirectUrl: "http://localhost/go", 
  customerPhoneNo: "09000000000"
}).then(data => {
  console.log(data)
}, err => {
  console.log(err)
})

credo.verifyCardNumber({
  orderCurrency: "NGN", 
  paymentSlug:"pIEiYn8xxxxxxxxxxxxx", 
  cardNumber: "4242424242424242"
}).then(data => {
  console.log(data)
}, err => {
  console.log(err)
})



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
[travis-url]: https://travis-ci.org/github.com/credogit/credo-node-sdk
