import React, { useContext, useEffect, useState } from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import Layout from "../components/layout"
import Checkout from "../components/checkout"

import { SiteContext } from "../components/context"

const Container = styled.div`
  padding: 60px;
  .product-image-wrapper {
    max-width: 200px;
    width: 200px;
  }
`
const Wrapper = styled.div`
  max-width: 1600px;
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
`
const Col = styled.div`
  display: flex;
  flex-direction: column;
`

const Cart = () => {
  const { getCart } = useContext(SiteContext)
  const [cart, setCart] = useState([])
  const [checkoutItems, setCheckoutItems] = useState([])
  useEffect(() => {
    ;(async () => {
      const cartItems = await getCart()
      setCart(cartItems)
      const checkoutItems = []
      //setup checkout lineitems for stripe
      if (cartItems) {
        for (let item of cartItems.lineItems) {
          //check if item exists, increment if does, add if doesn't
          const existingItem = checkoutItems.findIndex(
            x => x.price === item.stripeId
          )
          if (existingItem !== -1) {
            checkoutItems[existingItem] = {
              price: item.stripeId,
              quantity: checkoutItems[existingItem].quantity + 1,
            }
          } else {
            checkoutItems.push({ price: item.stripeId, quantity: 1 })
          }
        }
        setCheckoutItems(checkoutItems)
      }
    })()
  }, [getCart])
  //localStorage.clear()
  return (
    <Layout>
      <Container>
        <Wrapper>
          {cart && cart.lineItems ? (
            <Row>
              <Col>
                {cart.lineItems.map(item => (
                  <Row key={item.id}>
                    <div className="product-image-wrapper">
                      <Img
                        fluid={item.image.src.childImageSharp.fluid}
                        alt={item.image.src.alt}
                      />
                    </div>
                    <div className="item-details">
                      {item.title} <br />
                      {item.price} <br />
                      {Object.keys(item.variants).map((key, i) => (
                        <p key={`item${i}`}>
                          {key}: {item.variants[key]}
                        </p>
                      ))}
                      <p>Customization: {item.customization}</p>
                    </div>
                  </Row>
                ))}
              </Col>
              <Col>
                <Checkout lineItems={checkoutItems} />
              </Col>
            </Row>
          ) : (
            <Row>
              <Col>Your cart is empty</Col>
            </Row>
          )}
        </Wrapper>
      </Container>
    </Layout>
  )
}

export default Cart
