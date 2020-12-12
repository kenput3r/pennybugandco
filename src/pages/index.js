import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"

import swirlAccent from "../images/swirl-accent.png"
import swirlWhite from "../images/swirl-white.png"
import aboutBackground from "../images/about-background.png"
import flowerBottomRight from "../images/flower-bottom-right.png"
import flowerBottomLeft from "../images/flower-bottom-left.png"

const SwirlContainer = styled.div`
  padding-top: 30px;
  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 384px;
  }
  img {
    width: 55%;
    @media (max-width: 991px) {
      width: 70%;
    }
    @media (max-width: 428px) {
      width: 50%;
    }
  }
`
const Content = styled.div`
  background-color: var(--accent-dark);
  background-image: url(${swirlWhite});
  background-repeat: no-repeat;
  background-position: 150px 150px;
  background-size: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px 30px 60px 30px;
  width: 100%;
  /* @media (max-width: 767px) {
    padding-top: 90px;
  } */

  .v-offset {
    display: flex;
    flex-direction: row;
    width: 1600px;
    max-width: 100%;
    margin-top: -15vw;
    margin-left: auto;
    margin-right: auto;
    @media (max-width: 991px) {
      flex-wrap: wrap-reverse;
      margin-top: -30vw;
    }
    @media (max-width: 620px) {
      margin-top: -40vw;
    }
    @media (max-width: 428px) {
      margin-top: -250px;
    }
  }

  .about-us {
    background-color: var(--primary-light);
    background-image: url(${aboutBackground});
    background-position: right bottom;
    background-repeat: no-repeat;
    color: var(--primary-dark);
    display: flex;
    flex-direction: column;
    flex: 6;
    padding: 60px;
    @media (max-width: 991px) {
      flex: none;
      width: 100%;
    }
    @media (max-width: 566px) {
      padding: 60px 30px;
    }

    h2 {
      font-family: var(--title-font);
      font-size: 5rem;
      letter-spacing: 2px;
      margin-top: -120px;
      @media (max-width: 1103px) {
        margin-left: -60px;
      }
      @media (max-width: 566px) {
        font-size: 3rem;
        margin-left: -15px;
        margin-top: -95px;
      }
      @media (max-width: 428px) {
        margin-top: -90px;
      }
    }

    p {
      font-size: 1.5rem;
      font-weight: bold;
      line-height: 1.2;
      text-align: justify;
      @media (max-width: 500px) {
        text-align: center;
      }
    }
  }

  .logo-container {
    display: flex;
    flex-direction: column;
    flex: 6;
    margin-top: -15vw;
    padding-right: 30px;
    z-index: 14;
    @media (max-width: 991px) {
      flex: none;
      width: 30vw;
      margin-left: auto;
      margin-top: -11vw;
    }
    @media (max-width: 845px) {
      margin-top: -13vw;
    }
    @media (max-width: 767px) {
      margin-top: -27vw;
      margin-bottom: 60px;
      width: 40vw;
      z-index: initial;
    }
    @media (max-width: 428px) {
      width: 50vw;
      padding-right: 0;
    }

    .gatsby-image-wrapper {
      margin-left: -30px;
    }
  }

  .products {
    display: flex;
    flex-direction: row;
    width: 1600px;
    max-width: 100%;
    margin: 0 auto;
    padding-top: 30px;
    @media (max-width: 499px) {
      flex-wrap: wrap;
    }
  }

  .product {
    flex: 1;
    padding: 30px;
    @media (max-width: 767px) {
      padding: 30px 10px;
    }
    @media (max-width: 499px) {
      flex: none;
      padding: 30px 0;
      width: 100%;
    }
  }
`
const CallToAction = styled.div`
  padding: 60px 5px 60px 5px;

  .button-row {
    text-align: center;
    margin-top: -80px;
  }

  .button-container {
    border: 2px solid var(--primary-dark);
    display: inline-block;
    height: 65px;
    width: 220px;

    a {
      background-color: var(--primary-dark);
      color: #fff;
      display: flex;
      flex-direction: column;
      font-family: var(--button-font-fat);
      font-size: 1.5rem;
      height: 65px;
      justify-content: center;
      margin-left: -10px;
      margin-top: -14px;
      text-decoration: none;
      width: 216px;
    }
  }

  .right-flower-container {
    text-align: right;
    img {
      margin-right: -5px;
      margin-top: -100px;
      @media (max-width: 428px) {
        width: 80px;
        margin-top: -80px;
      }
    }
  }

  .quote {
    color: var(--primary-dark);
    font-family: var(--title-font);
    font-size: 3rem;
    line-height: 1;
    padding: 20px 0 60px 0;
    text-align: center;
  }

  .left-flower-container {
    img {
      width: 200px;
      margin-left: -5px;
      margin-bottom: -190px;
      position: relative;
      z-index: 11;
      @media (max-width: 428px) {
        width: 80px;
        margin-bottom: -110px;
      }
    }
  }
`

const IndexPage = ({ data }) => (
  <Layout page="home">
    <SEO title="The Gift Of Giving" page="index" />
    <SwirlContainer>
      <img src={swirlAccent} alt="decorative line" />
    </SwirlContainer>
    <Content>
      <div className="v-offset">
        <div className="about-us">
          <h2>About Us</h2>
          <p>
            Penny Bug &amp; Co. wants to make gift giving effortless by helping
            you create meaningful and customizable care packages for all
            occasions. Because our commitment here is to continually give back,
            we will be featuring a local business in every box so that we can
            showcase their creative work to you and your loved ones. When you
            buy a care package from Penny Bug &amp; Co., not only will you make
            someone's day, you will be contributing to the success of small
            businesses!
          </p>
        </div>
        <div className="logo-container">
          <Img
            fluid={data.logo.childImageSharp.fluid}
            alt="Penny the Pug logo"
          />
        </div>
      </div>
      <div className="products">
        <div className="product">
          <Img
            fluid={data.product1.childImageSharp.fluid}
            alt="mr. and mrs. coffee mugs"
          />
        </div>
        <div className="product">
          <Img fluid={data.product2.childImageSharp.fluid} alt="holiday box" />
        </div>
        <div className="product">
          <Img
            fluid={data.product3.childImageSharp.fluid}
            alt="penny bug and co packaging"
          />
        </div>
      </div>
    </Content>
    <CallToAction>
      <div className="button-row">
        <div className="button-container">
          <Link to="/products">SHOP NOW</Link>
        </div>
      </div>
      <div className="right-flower-container">
        <img src={flowerBottomRight} alt="decorative flower" />
      </div>
      <div className="quote">
        Giving to others is the greatest gift you can give yourself.
      </div>
      <div className="left-flower-container">
        <img src={flowerBottomLeft} alt="decorative flower" />
      </div>
    </CallToAction>
  </Layout>
)

export default IndexPage

export const data = graphql`
  query homePageQuery {
    logo: file(relativePath: { eq: "logo.png" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    product1: file(relativePath: { eq: "product-1.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 480) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    product2: file(relativePath: { eq: "product-2.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 480) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    product3: file(relativePath: { eq: "product-3.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 480) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
