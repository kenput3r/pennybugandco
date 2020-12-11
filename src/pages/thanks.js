import React, { useEffect, useContext, useState } from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import styled from "styled-components"
import { SiteContext } from "../components/context"

const Page = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 360px);
  .message {
    max-width: 480px;
  }
  h1 {
    color: var(--primary-dark);
    font-family: var(--title-font);
  }
  a {
    color: var(--accent-dark);
    font-weight: bold;
  }
`

const log_order = async orderInfo => {
  const headers = {
    "Content-type": "application/json",
    Accept: "application/json",
  }
  const response = await fetch("/api/log_order", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ orderInfo }),
  })
  const response_json = await response.json()
  console.log(response_json)
}

/**
 * @function get_customer - gets stripe customer info and payments session
 * @param {*} session_id
 * @returns { customer, session }
 */
const get_customer = async session_id => {
  const headers = {
    "Content-type": "application/json",
    Accept: "application/json",
  }
  const response = await fetch("/api/get_customer", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ session_id }),
  })
  const response_json = await response.json()
  return response_json
}

const Thanks = () => {
  const { getCart } = useContext(SiteContext)
  const [hasSession, setHasSession] = useState(true)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const session_id = urlParams.get("session_id")
    ;(async () => {
      if (session_id) {
        setHasSession(true)
        const cart = await getCart()
        const customer = await get_customer(session_id)
        console.log(customer)
        if (cart && cart.lineItems && customer) {
          const orderInfo = { lineItems: cart.lineItems, customer }
          log_order(orderInfo)
          localStorage.removeItem("cartItems")
        }
      } else {
        setHasSession(false)
      }
    })()
  }, [getCart])

  return (
    <Layout>
      <Page>
        {hasSession ? (
          <div className="message">
            <h1>Thanks!</h1>
            <p>
              Thank you for your order{" "}
              <span role="img" aria-label="dancing">
                💃
              </span>
            </p>
            <p>
              Look for an email with your order info. Have questions?{" "}
              <Link to="/contact">Send us a message</Link>!
            </p>
          </div>
        ) : (
          <div className="message">
            <p>
              Oh no{" "}
              <span role="img" aria-label="headache">
                💆‍♀️
              </span>{" "}
              It looks like your session has expired.{" "}
            </p>
            <p>
              If you are looking for info on your order, check your email. Still
              have questions? <Link to="/contact">Send us a message</Link>!
            </p>
          </div>
        )}
      </Page>
    </Layout>
  )
}

export default Thanks
