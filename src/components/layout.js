import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import "./layout.css"
import "./fonts.css"
import Header from "./header"
import Drawer from "./drawer"
import Footer from "./footer"
import flowerTopLeft from "../images/flower-top-left.png"

const Container = styled.div`
  background-image: ${({ page }) =>
    ["cart"].includes(page) === false ? "url(" + flowerTopLeft + ")" : "none"};
  background-repeat: no-repeat;
  background-position: -30px 20px;
  @media (max-width: 428px) {
    background-size: 35vw;
  }
  main {
    padding-top: 61px;
  }
`

const Layout = ({ children, page }) => {
  return (
    <Container page={page}>
      <Header page={page} />
      <Drawer />
      <main>{children}</main>
      <Footer page={page} />
    </Container>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
