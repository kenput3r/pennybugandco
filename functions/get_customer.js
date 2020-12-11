"use strict"
require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_LIVE_KEY)

exports.handler = async function (event, context) {
  const body = JSON.parse(event.body)
  console.log(body)
  const session = await stripe.checkout.sessions.retrieve(body.session_id)
  const customer = await stripe.customers.retrieve(session.customer)
  return {
    statusCode: 200,
    body: JSON.stringify({ customer, session }),
  }
}
