import React, { useEffect, useContext } from "react"
import Layout from "../components/layout"
import { SiteContext } from "../components/context"

const log_order = async orderInfo => {
  const headers = {
    "Content-type": "application/json",
    Accept: "application/json",
  }
  const response = await fetch("http://localhost:8888/api/log_order", {
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
  const response = await fetch("http://localhost:8888/api/get_customer", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ session_id }),
  })
  const response_json = await response.json()
  return response_json
}

const Thanks = () => {
  const { getCart } = useContext(SiteContext)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const session_id = urlParams.get("session_id")
    ;(async () => {
      if (session_id) {
        const cart = await getCart()
        const customer = await get_customer(session_id)
        console.log(customer)
        if (cart && cart.lineItems && customer) {
          const orderInfo = { lineItems: cart.lineItems, customer }
          log_order(orderInfo)
          localStorage.removeItem("cartItems")
        }
      }
    })()
  }, [getCart])

  return (
    <Layout>
      <div>thank you for your order</div>
    </Layout>
  )
}

export default Thanks
