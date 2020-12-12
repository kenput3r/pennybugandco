import React, { useContext, useEffect, useState } from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import Layout from "../components/layout"
import Checkout from "../components/checkout"
import { SiteContext } from "../components/context"
import SEO from "../components/seo"
import trashCan from "../images/trash-can.png"

const Container = styled.div`
  min-height: calc(100vh - 336px);
  padding: 60px;
  @media (max-width: 500px) {
    padding: 15px;
  }
  h1 {
    color: var(--accent-dark);
    font-family: var(--button-font-fat);
    letter-spacing: 2px;
  }
  .product-image-wrapper {
    max-width: 200px;
    width: 200px;
    @media (max-width: 500px) {
      max-width: 100%;
      width: 100%;
      margin-bottom: 15px;
    }
  }
  .item-details {
    padding-left: 1.45rem;
    @media (max-width: 500px) {
      padding-left: 0;
    }
    p {
      margin-bottom: 0;
      bottom: 0;
    }
  }
  h3 {
    color: var(--primary-dark);
    font-family: var(--button-font-fat);
    letter-spacing: 2px;
    margin-bottom: 0;
    text-transform: uppercase;
  }
  .w-100 {
    width: 100%;
  }
  .s100 {
    @media (max-width: 500px) {
      width: 100%;
    }
  }
  .flex-1 {
    flex: 1;
  }
  .total {
    color: var(--primary-dark);
    display: flex;
    justify-content: space-between;
    font-size: 2rem;
    margin-bottom: 1.45rem;
    .label {
      font-family: var(--button-font-fat);
    }
  }
  .shipping-message {
    color: var(--primary-light);
    font-style: italic;
  }
`
const Wrapper = styled.div`
  height: 100%;
  max-width: 900px;
  margin: 0 auto;
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  &.empty-state {
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  &.contents {
    border-bottom: 1px solid var(--accent-dark);
    margin-bottom: 30px;
  }

  &.product {
    margin-bottom: 1.45rem;
    @media (max-width: 500px) {
      flex-wrap: wrap;
    }
  }

  &.justify-end {
    justify-content: flex-end;
    @media (max-width: 500px) {
      justify-content: center;
      margin-bottom: 1.45rem;
    }
  }
`
const Col = styled.div`
  display: flex;
  flex-direction: column;

  &.price-col {
    justify-content: space-between;
    padding-left: 30px;
    p {
      margin-bottom: 0;
    }
    button {
      background-color: transparent;
      border: 0;
      color: var(--primary-medium);
      display: flex;
      align-items: center;
      span {
        padding-top: 3px;
      }
    }
    img {
      margin-bottom: 0;
    }
  }
`

const Cart = () => {
  const { getCart, removeFromCart } = useContext(SiteContext)
  const [cart, setCart] = useState([])
  const [cartTotal, setCartTotal] = useState(0)
  const [checkoutItems, setCheckoutItems] = useState([])
  const handleRemove = async id => {
    const cart_update = await removeFromCart(id)
    const cartItems = await getCart()
    // const index = cart.lineItems.findIndex(item => item.id === id)
    // const temp_cart = { ...cart }
    // temp_cart.lineItems.splice(index, 1)
    setCart(cartItems)
    updateCartTotal(cartItems)
  }
  const updateCartTotal = cartItems => {
    if (cartItems && cartItems.lineItems.length) {
      let total = 0
      for (let item of cartItems.lineItems) {
        total += item.price
      }
      setCartTotal(total)
    }
  }
  useEffect(() => {
    ;(async () => {
      const cartItems = await getCart()
      setCart(cartItems)
      updateCartTotal(cartItems)
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
    <Layout page="cart">
      <SEO title="Cart" />
      <Container>
        <Wrapper>
          {cart && cart.lineItems && cart.lineItems.length ? (
            <>
              <Row className="contents">
                <Col className="w-100">
                  <h1>YOUR CART</h1>
                  {cart.lineItems.map(item => (
                    <Row key={item.id} className="product">
                      <Col className="s100">
                        <div className="product-image-wrapper">
                          <Link
                            to={`/products/${item.slug}`}
                            title={item.title}
                          >
                            <Img
                              fluid={item.image.src.childImageSharp.fluid}
                              alt={item.image.src.alt}
                            />
                          </Link>
                        </div>
                      </Col>
                      <Col className="w-100">
                        <Row>
                          <Col className="flex-1">
                            <div className="item-details">
                              <h3>{item.title}</h3>
                              {item.variants &&
                                Object.keys(item.variants).map((key, i) => (
                                  <p key={`item${i}`}>
                                    {key}: {item.variants[key]}
                                  </p>
                                ))}
                              <p>Customization: {item.customization}</p>
                              <p>QTY: {item.qty ? item.qty : 1}</p>
                            </div>
                          </Col>
                          <Col className="price-col">
                            <p>
                              <button onClick={() => handleRemove(item.id)}>
                                <img src={trashCan} alt="trash can" />{" "}
                                <span>Remove</span>
                              </button>
                            </p>
                            <p className="price">${item.price}</p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  ))}
                </Col>
              </Row>
              <Row className="justify-end">
                <Col>
                  <div className="shipping-message">
                    <p>
                      *Free delivery in counties of Orange and Riverside. <br />
                      Some orders may require an additional shipping charge.
                    </p>
                  </div>
                  <div className="total">
                    <span className="label">Total</span>{" "}
                    <span>${cartTotal}</span>
                  </div>
                  <Checkout lineItems={checkoutItems} />
                </Col>
              </Row>
            </>
          ) : (
            <Row className="empty-state">
              <Col>
                <h1>Your cart is empty</h1>
              </Col>
            </Row>
          )}
        </Wrapper>
      </Container>
    </Layout>
  )
}

export default Cart
