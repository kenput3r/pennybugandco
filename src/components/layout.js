import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import "./layout.css"
import "./fonts.css"
import Header from "./header"
import Footer from "./footer"
import flowerTopLeft from "../images/flower-top-left.png"

const Container = styled.div`
  background-image: url(${flowerTopLeft});
  background-repeat: no-repeat;
  background-position: -30px 20px;
  @media (max-width: 428px) {
    background-size: 35vw;
  }
`

const Layout = ({ children, page }) => {
  return (
    <Container page={page}>
      <Header page={page} />
      <main>{children}</main>
      <Footer page={page} />
    </Container>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
