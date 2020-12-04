import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import facebook from "../images/facebook.png"
import instagram from "../images/instagram-white.png"
import email from "../images/email-white.png"

const Container = styled.div`
  padding-top: 30px;

  footer {
    background-color: var(--primary-light);
    padding-bottom: 20px;

    nav {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      height: 50px;
    }

    a {
      display: inline-block;
      padding: 10px;
      background-color: var(--primary-dark);
      border-radius: 50%;
      height: 60px;
      width: 60px;
      text-align: center;
      margin-left: 5px;
      margin-right: 5px;
      margin-top: -50px;

      img {
        height: 100%;
        margin-bottom: 0;

        &.email {
          height: auto;
          width: 100%;
          margin-top: 5px;
        }
      }
    }
  }
  .logo-container {
    max-width: 200px;
    margin: 0 auto;
  }
`

const Footer = ({ page }) => {
  const data = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <Container>
      <footer>
        <nav>
          <a
            href="https://instagram.com/pennybug.co"
            target="_blank"
            rel="noreferrer"
          >
            <img src={instagram} alt="instagram" />
          </a>
          <a
            href="https://facebook.com/pennybug.co"
            target="_blank"
            rel="noreferrer"
          >
            <img src={facebook} alt="facebook" />
          </a>
          <a href="mailto:info@pennybug.co">
            <img className="email" src={email} alt="email" />
          </a>
        </nav>
        <div className="logo-container">
          <Img fluid={data.logo.childImageSharp.fluid} />
        </div>
      </footer>
    </Container>
  )
}

export default Footer
