'use strict'

module.exports = {
  /*
    Initiate Payments
    @param: currency(required), amount(required), paymentOptions(required), transRef(required), customerEmail(required), redirectUrl(required), customerPhoneNo(required)
  */
  initiatePayments: {
    method: 'POST',
    path: '/payments/initiate',
    params: {amount$: Number, currency$: String, transRef$: String, paymentOptions$: String, customerEmail$: String, customerName$: String, redirectUrl$: String, customerPhoneNo$: String},
    send_json: true, 
    param_defaults: null,
    route_params: null
  },
  /*
    Card Payments
    @param: expiryMonth(required), securityCode(required), expiryYear(required), orderAmount(required), orderCurrency(required), orderCurrency(required), transRef(required), customerName(required), customerEmail(required), customerPhoneNo(required)
  */
  thirdPartyPay: {
    method: 'POST',
    path: '/payments/card/third-party/pay',
    params: {expiryMonth$: String, securityCode$: String, expiryYear$: String, orderAmount$: Number, orderCurrency$: String, transRef$: String, cardNumber$: String, customerEmail$: String, customerName$: String, customerPhoneNo$: String},
    send_json: true,
    param_defaults: null,
    route_params: null
  },
  /*
    Verify Card Number
    @param: cardNumber(required), paymentSlug(required), orderCurrency(required)
  */
  verifyCardNumber: {
    method: 'POST',
    path: '/payments/card/third-party/3ds-verify-card-number',
    params: {cardNumber: String, paymentSlug$: String, orderCurrency: String},
    send_json: true,
    param_defaults: null,
    route_params: null
  },
  /*
    Make Payments
    @param: currency(required), amount(required), paymentOptions(required), currency, transRef(required), customerName(required), customerEmail(required), redirectUrl(required), customerPhoneNo(required)
  */
  pay:{
    method: 'POST',
    path: '/payments/card/third-party/3ds-pay',
    params: {amount$: Number, currency$: String, transRef$: String, paymentOptions$: String, customerEmail$: String, customerName$: String, redirectUrl$: String, customerPhoneNo$: String},
    send_json: true,
    param_defaults: null,
    route_params: null
  }
}
