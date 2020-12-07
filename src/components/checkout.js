import React, { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"

const buttonStyles = {
  fontSize: "13px",
  textAlign: "center",
  color: "#000",
  padding: "12px 60px",
  boxShadow: "2px 5px 10px rgba(0,0,0,.1)",
  backgroundColor: "rgb(255, 178, 56)",
  borderRadius: "6px",
  letterSpacing: "1.5px",
}

const buttonDisabledStyles = {
  opacity: "0.5",
  cursor: "not-allowed",
}

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
    <button
      disabled={loading}
      style={
        loading ? { ...buttonStyles, ...buttonDisabledStyles } : buttonStyles
      }
      onClick={redirectToCheckout}
    >
      Checkout
    </button>
  )
}

export default Checkout
