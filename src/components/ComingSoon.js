import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import styled from "styled-components"
import logo from "../images/penny-bug-and-co-logo-white.png"
import instagram from "../images/instagram.png"
import facebook from "../images/facebook.png"

const ContainerWithBackground = styled(BackgroundImage)`
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  max-width: 100vw;
  height: 100vh;

  @media (max-width: 420px) {
    justify-content: flex-start;
    padding-top: 60px;
  }
`
const LogoContainer = styled.div`
  img {
    width: 350px;
    @media (max-width: 420px) {
      max-width: 60vw;
    }
  }
`
const QuoteContainer = styled.div`
  max-width: 80vw;
  margin: 0 auto;
  p {
    font-family: AmaticSC;
    font-weight: bold;
    font-size: 32px;
    line-height: 1;
    text-align: center;
  }
`
const ComingSoonTextContainer = styled.div`
  h2 {
    font-family: abril-display;
    font-weight: bold;
  }
`
const SocialMediaContainer = styled.div`
  a {
    display: inline-block;
    padding: 5px;
    margin: 5px;
  }
  img {
    height: 36px;
  }
`
const ComingSoon = () => {
  const data = useStaticQuery(graphql`
    query {
      BackgroundImage: file(relativePath: { eq: "penny-bug-co-bg.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 2048) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <ContainerWithBackground fluid={data.BackgroundImage.childImageSharp.fluid}>
      <LogoContainer>
        <img src={logo} alt="Penny Bug &amp; Co" />
      </LogoContainer>
      <QuoteContainer>
        <p>Giving to others is the greatest gift you can give yourself</p>
      </QuoteContainer>
      <ComingSoonTextContainer>
        <h2>COMING SOON</h2>
      </ComingSoonTextContainer>
      <SocialMediaContainer>
        <a
          href="https://instagram.com/pennybug.co"
          target="_blank"
          rel="noreferrer"
        >
          <img src={instagram} alt="Penny Bug & Co on Instagram" />
        </a>
        <a
          href="https://www.facebook.com/pennybug.co"
          target="_blank"
          rel="noreferrer"
        >
          <img src={facebook} alt="Penny Bug & Co on Facebook" />
        </a>
      </SocialMediaContainer>
    </ContainerWithBackground>
  )
}

export default ComingSoon
