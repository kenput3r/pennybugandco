import React from "react"
import styled from "styled-components"

import facebook from "../images/facebook.png"
import instagram from "../images/instagram-white.png"
import email from "../images/email-white.png"

const Container = styled.div`
  padding-top: 30px;

  footer {
    background-color: var(--primary-light);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100px;

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
      margin-top: -100px;

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
`

const footer = () => {
  return (
    <Container>
      <footer>
        <a href="/">
          <img src={instagram} alt="instagram" />
        </a>
        <a href="/">
          <img src={facebook} alt="facebook" />
        </a>
        <a href="/">
          <img className="email" src={email} alt="email" />
        </a>
      </footer>
    </Container>
  )
}

export default footer
