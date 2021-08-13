'use strict'

const Credo = require('./src/credo/index.js')

const credoInstance = new Credo("sk_live-wXaEK9Oii4EGfBD2lB6uopEBYBzA4l.BWsZP1VLm0-l", "production")

// credoInstance.initiatePayments({
//   amount: 100,
//   currency: "NGN",
//   redirectUrl: "https://mywebsites.com/callback",
//   transRef: "string",
//   paymentOptions: "CARD,BANK,USSD",
//   customerEmail: "customer@something.com",
//   customerName: "John Doe",
//   customerPhoneNo: "+234 813 000 000"
// }).then(data => {
//   console.log(data)
// }, err => {
//   console.log(err)
// })

// credoInstance.thirdPartyPay({
//   "orderAmount": 5000,
//   "orderCurrency": "NGN",
//   "cardNumber": "5399670123490229",
//   "expiryMonth": "05",
//   "expiryYear": "22",
//   "securityCode": "439",
//   "transRef": "iy67f64hvc63",
//   "customerEmail": "chunkylover53@aol.com",
//   "customerName": "King of Kings",
//   "customerPhoneNo": "+2348066282658",
//   "paymentSlug": "0H0UOEsawNjkIxgspANd"
// }).then(data => {
//   console.log(data)
// }, err => {
//   console.log(err)
// })

credoInstance.verifyTransaction({
  transRef: "2223333",
}).then(data => {
  console.log(data)
}, err => {
  console.log(err)
})


//console.log(credoInstance)

Credo.prototype.version = '0.0.1'

module.exports = Credo