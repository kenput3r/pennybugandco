"use strict"
const stripe = require("stripe")(
  "sk_test_51Hv9qGHx7oIWq14Ji4j7cb3zoCbtV7op0z1N9Pa0KW1SikSoDQzTp6dSlE62JY60yt71mVt1N5a4j6mcSWBrgEsP0056hmQwdg"
)

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
