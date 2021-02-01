'use strict'

const Credo = require('./src/credo/index.js')

Credo.prototype.version = '0.0.1'

module.exports = Credo

// start delete here
const credo = new Credo("sk_demo-Dj1rcY2rxNpmJgYwmhylIy7RpoS7Zy.ygUca22uTg-d", "development")


let payment = credo.initiatePayments({
  amount: 100,
  currency: "NGN",
  redirectUrl: "https://mywebsites.com/callback",
  transRef: "string",
  paymentOptions: "CARD,BANK,USSD",
  customerEmail: "customer@something.com",
  customerName: "John Doe",
  customerPhoneNo: "+234 813 000 000"
}).then(data => {
	console.log("Payment initiation was successful")
}, err => {
	console.error(err)
})



// end delete here
