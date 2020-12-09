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
      "pk_test_51Hv9qGHx7oIWq14JbE7C4sEdpj2fjpbICnW4opW8culJ9SBRZjgPu2O2DisTMLZP4TmtB2nPkUNXVSR7HUVAOu4800CrkUsBEe"
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
      successUrl: `http://localhost:8888/thanks/?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `http://localhost:8000/`,
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
