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
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
  }
  .message {
    color: var(--primary-dark);
    font-family: var(--title-font);
    padding: 60px 10px;
    width: 400px;
  }
`

const NotFound = ({ data }) => {
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
            404 Page Not Found{" "}
            <span role="img" aria-label="confused">
              🤷‍♀️
            </span>
          </h1>
        </BackgroundImage>
      </Page>
    </Layout>
  )
}

export default NotFound

export const query = graphql`
  query NotFoundPage {
    backgroundImage: file(relativePath: { eq: "not-found.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 2048) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
