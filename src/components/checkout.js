import React, { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import styled from "styled-components"

const ButtonWrapper = styled.div`
  border: 4px solid var(--primary-dark);
  height: 74px;
  margin-left: 10px;
  margin-top: 10px;
  width: 300px;

  button {
    background-color: var(--primary-dark);
    border-radius: 0;
    border: 0;
    color: var(--accent-light);
    display: block;
    font-family: var(--button-font-fat);
    font-size: 2rem;
    padding: 20px;
    width: 100%;
    margin-top: -10px;
    margin-left: -10px;
  }
`

let stripePromise
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      "pk_live_51Hv9qGHx7oIWq14JsaIyjgmEoQlOhSb2n8Bw3Q9HvBtFYvpITX8Me6LwAkSbDakiaIfOH0UvkWcBeMOClmsYcS6C00Iozlmftg"
    )
  }
  return stripePromise
}

const Checkout = ({ lineItems }) => {
  const [loading, setLoading] = useState(false)

  const redirectToCheckout = async event => {
    event.preventDefault()
    setLoading(true)

    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout({
      mode: "payment",
      lineItems: lineItems,
      successUrl: `https://www.pennybug.co/thanks/?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `https://www.pennybug.co/`,
      shippingAddressCollection: {
        allowedCountries: ["US", "CA"],
      },
    })

    if (error) {
      console.warn("Error:", error)
      setLoading(false)
    }
  }

  return (
    <ButtonWrapper>
      <button disabled={loading} onClick={redirectToCheckout}>
        CHECKOUT
      </button>
    </ButtonWrapper>
  )
}

export default Checkout
