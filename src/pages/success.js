import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import BackgroundImage from "gatsby-background-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Page = styled.div`
  min-height: calc(100vh - 360px);
  @media (max-width: 500px) {
    margin-top: -60px;
  }
  .background-wrapper {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .message {
    color: #fff;
    background-color: var(--accent-light);
    border: 8px solid #fff;
    font-family: var(--title-font);
    padding: 10px;
    width: 400px;
  }
`

const Success = ({ data }) => {
  console.log(data)
  return (
    <Layout page="success">
      <SEO title="Message Successfully Sent" />
      <Page>
        <BackgroundImage
          className="background-wrapper"
          fluid={data.backgroundImage.childImageSharp.fluid}
        >
          <h1 className="message">
            We received your message{" "}
            <span role="img" aria-label="paw prints">
              🐾
            </span>
          </h1>
        </BackgroundImage>
      </Page>
    </Layout>
  )
}

export default Success

export const query = graphql`
  query SuccessPage {
    backgroundImage: file(relativePath: { eq: "message-success.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 2048) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
