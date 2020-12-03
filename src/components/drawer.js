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
  padding-top: calc(2rem + 86px);
  position: fixed;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  transform: ${({ isDrawerOpen }) =>
    isDrawerOpen ? "translateX(0)" : "translateX(-100%)"};
  width: 80vw;
  z-index: 10;
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
  const { isDrawerOpen } = useContext(SiteContext)
  return (
    <Container isDrawerOpen={isDrawerOpen}>
      <div>
        <Link to="/">HOME</Link>
      </div>
      <div>
        <Link to="/products">PRODUCTS</Link>
      </div>
      <div>
        <Link to="/cart">CART</Link>
      </div>
    </Container>
  )
}

export default Drawer
