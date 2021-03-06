import React, { useContext } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { SiteContext } from "./context"

const Container = styled.div`
  box-sizing: border-box;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: var(--primary-medium);
  height: 100vh;
  max-height: 100vh;
  font-family: var(--button-font-fat);
  text-align: left;
  padding: 2rem;
  padding-top: 0;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  transition: transform 0.3s ease-in-out;
  transform: ${({ isDrawerOpen }) =>
    isDrawerOpen ? "translateX(0)" : "translateX(-100%)"};
  width: 80vw;
  z-index: 12;
  @media (min-width: 768px) {
    display: none;
  }
  a {
    color: #fff;
    font-size: 2rem;
    line-height: 1.2;
    text-decoration: none;
  }
`

const Drawer = () => {
  const { isDrawerOpen, setIsDrawerOpen } = useContext(SiteContext)
  return (
    <Container isDrawerOpen={isDrawerOpen}>
      <div>
        <Link to="/" onClick={() => setIsDrawerOpen(false)}>
          HOME
        </Link>
      </div>
      <div>
        <Link to="/products" onClick={() => setIsDrawerOpen(false)}>
          PRODUCTS
        </Link>
      </div>
      <div>
        <Link to="/cart" onClick={() => setIsDrawerOpen(false)}>
          CART
        </Link>
      </div>
      <div>
        <Link to="/contact" onClick={() => setIsDrawerOpen(false)}>
          CONTACT
        </Link>
      </div>
    </Container>
  )
}

export default Drawer
