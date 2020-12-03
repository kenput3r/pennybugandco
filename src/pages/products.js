import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import Layout from "../components/layout"
import bottomFlower from "../images/product-flower-bottom.png"

const Container = styled.div`
  h1 {
    color: var(--primary-dark);
    font-family: var(--title-font);
    padding-top: 1.45rem;
    text-align: center;
  }

  li {
    list-style-type: none;
  }

  .products-row {
    justify-content: flex-start;
  }
  .product {
    width: 30%;
    margin-left: 1.5%;
    margin-right: 1.5%;
    margin-bottom: 1.45rem;
    a.image-container {
      background-color: var(--accent-dark);
      display: block;
      padding-bottom: 10px;
      padding-right: 10px;
      .spacer {
        background-color: #fff;
        height: 10px;
        width: 100%;
        margin-right: -10px;
        position: absolute;
      }
      .gatsby-image-wrapper {
        margin-left: -10px;
      }
    }
  }
  .title {
    a {
      color: var(--primary-dark);
      text-decoration: none;
    }
  }
  .price {
    color: var(--primary-dark);
  }
  .title,
  .price {
    font-family: var(--button-font-fat);
    margin-left: -10px;
  }
  .flower {
    margin-top: -75px;
    position: absolute;
    right: 0;

    @media (max-width: 500px) {
      display: none;
    }
  }
`
const Wrapper = styled.div`
  width: 1200px;
  max-width: 100%;
  margin: 0 auto;
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`
const Col = styled.div`
  display: flex;
  flex-direction: column;

  &.filters {
    flex: 2;

    button {
      background-color: transparent;
      border: 0;
      color: var(--primary-dark);
      text-transform: uppercase;
      font-family: var(--button-font);
      font-weight: bold;
      :hover {
        cursor: pointer;
      }
    }
    li {
      li {
        button {
          font-weight: normal;
        }
      }
    }
  }
  &.products {
    flex: 8;
  }
`

const Products = ({ data }) => {
  const [filter, setFilter] = useState("")
  const products = filter
    ? data.allProductsJson.edges.filter(product =>
        product.node.tags.includes(filter)
      )
    : data.allProductsJson.edges
  return (
    <Layout>
      <Container>
        <Wrapper>
          <h1>Products</h1>
          <Row>
            <Col className="filters">
              <ul>
                <li>
                  <button onClick={() => setFilter("")}>ALL PRODUCTS</button>
                </li>
                <li>
                  <button onClick={() => setFilter("Box Sets")}>
                    BOX SETS
                  </button>
                  <ul>
                    <li>
                      <button onClick={() => setFilter("Mr. & Mrs.")}>
                        Mr. &amp; Mrs.
                      </button>
                    </li>
                    <li>
                      <button onClick={() => setFilter("Baby")}>Baby</button>
                    </li>
                    <li>
                      <button onClick={() => setFilter("Pet")}>Pet</button>
                    </li>
                  </ul>
                </li>
                <li>
                  <button onClick={() => setFilter("Ornaments")}>
                    Ornaments
                  </button>
                </li>
                <li>
                  <button onClick={() => setFilter("Cups")}>Cups</button>
                  <ul>
                    <li>
                      <button onClick={() => setFilter("Mugs")}>Mugs</button>
                    </li>
                    <li>
                      <button onClick={() => setFilter("Flutes")}>
                        Flutes
                      </button>
                    </li>
                    <li>
                      <button onClick={() => setFilter("Tumblers")}>
                        Tumblers
                      </button>
                    </li>
                  </ul>
                </li>
                <li>
                  <button onClick={() => setFilter("Bandanas")}>
                    Bandanas
                  </button>
                </li>
                <li>
                  <button onClick={() => setFilter("Cards")}>Cards</button>
                </li>
              </ul>
            </Col>
            <Col className="products">
              <Row className="products-row">
                {products.map(product => (
                  <div className="product" key={product.node.id}>
                    <Link
                      className="image-container"
                      to={`/products/${product.node.slug}`}
                    >
                      <div className="spacer"></div>
                      <Img
                        fluid={product.node.images[0].src.childImageSharp.fluid}
                        alt={product.node.images[0].alt}
                      />
                    </Link>
                    <div className="title">
                      <Link to={`/products/${product.node.slug}`}>
                        {product.node.title}
                      </Link>
                    </div>
                    <div className="price">${product.node.price} USD</div>
                  </div>
                ))}
              </Row>
            </Col>
          </Row>
        </Wrapper>
        <img src={bottomFlower} alt="decorative flower" className="flower" />
      </Container>
    </Layout>
  )
}

export default Products

export const query = graphql`
  query {
    allProductsJson {
      edges {
        node {
          title
          id
          slug
          price
          tags
          images {
            alt
            src {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
                id
              }
            }
          }
        }
      }
    }
  }
`
