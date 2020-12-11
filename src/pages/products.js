import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"
import bottomFlower from "../images/product-flower-bottom.png"

const Container = styled.div`
  h1 {
    color: var(--primary-dark);
    font-family: var(--title-font);
    padding-top: 1.45rem;
    text-align: center;
  }

  .mobile-filters-toggle {
    display: none;
    @media (max-width: 767px) {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      padding: 0 5px;
    }
    button {
      background-color: transparent;
      border: 0;
      color: var(--primary-medium);
      font-family: var(--button-font);
      padding: 2px;
      margin-bottom: 2px;
    }
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
    @media (max-width: 767px) {
      width: 97%;
    }
    a.image-container {
      background-color: var(--accent-dark);
      display: block;
      padding-bottom: 10px;
      padding-right: 10px;
      position: relative;
      .spacer {
        background-color: #fff;
        height: 10px;
        left: 0;
        width: 100%;
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
    @media (max-width: 991px) {
      flex: 3;
    }
    @media (max-width: 767px) {
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
      position: fixed;
      top: 0;
      left: 0;
      transition: transform 0.3s ease-in-out;
      transform: ${({ isFiltersOpen }) =>
        isFiltersOpen ? "translateX(0)" : "translateX(-100%)"};
      width: 80vw;
      z-index: 10;
      button {
        color: #fff !important;
        &.close-filters {
          font-size: 2rem;
        }
      }
      .main-list {
        margin-left: 0;
      }
    }

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
      ::after {
        content: "";
        display: table;
        width: 100%;
        border-bottom: 3px solid transparent;
      }
      &.active:focus {
        ::after {
          border-bottom: 3px solid transparent;
        }
      }
      &.active {
        ::after {
          border-bottom: 3px solid var(--accent-dark);
        }
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
    @media (max-width: 767px) {
      flex: none;
      width: 100%;
      max-width: 100%;
      padding-left: 15px;
    }
  }
`

const Products = ({ data }) => {
  const [filter, setFilterState] = useState("")
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const products = filter
    ? data.allProductsJson.edges.filter(product =>
        product.node.tags.includes(filter)
      )
    : data.allProductsJson.edges
  const setFilter = filter => {
    setFilterState(filter)
    setIsFiltersOpen(false)
  }
  return (
    <Layout>
      <SEO title="Products" />
      <Container>
        <Wrapper>
          <h1>Products</h1>
          <div className="mobile-filters-toggle">
            <button onClick={() => setIsFiltersOpen(!isFiltersOpen)}>
              +FILTERS
            </button>
          </div>
          <Row>
            <Col className="filters" isFiltersOpen={isFiltersOpen}>
              <div className="mobile-filters-toggle">
                <button
                  className="close-filters"
                  onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                >
                  &times;
                </button>
              </div>
              <ul className="main-list">
                <li>
                  <button
                    className={filter === "" ? `active` : ``}
                    onClick={() => setFilter("")}
                  >
                    ALL PRODUCTS
                  </button>
                </li>
                <li>
                  <button
                    className={filter === "Box Sets" ? `active` : ``}
                    onClick={() => setFilter("Box Sets")}
                  >
                    BOX SETS
                  </button>
                  <ul>
                    <li>
                      <button
                        className={filter === "Mr. & Mrs." ? `active` : ``}
                        onClick={() => setFilter("Mr. & Mrs.")}
                      >
                        Mr. &amp; Mrs.
                      </button>
                    </li>
                    <li>
                      <button
                        className={filter === "Baby" ? `active` : ``}
                        onClick={() => setFilter("Baby")}
                      >
                        Baby
                      </button>
                    </li>
                    <li>
                      <button
                        className={filter === "Pet" ? `active` : ``}
                        onClick={() => setFilter("Pet")}
                      >
                        Pet
                      </button>
                    </li>
                  </ul>
                </li>
                <li>
                  <button
                    className={filter === "Ornaments" ? `active` : ``}
                    onClick={() => setFilter("Ornaments")}
                  >
                    Ornaments
                  </button>
                </li>
                <li>
                  <button
                    className={filter === "Cups" ? `active` : ``}
                    onClick={() => setFilter("Cups")}
                  >
                    Cups
                  </button>
                  <ul>
                    <li>
                      <button
                        className={filter === "Mugs" ? `active` : ``}
                        onClick={() => setFilter("Mugs")}
                      >
                        Mugs
                      </button>
                    </li>
                    <li>
                      <button
                        className={filter === "Tumblers" ? `active` : ``}
                        onClick={() => setFilter("Tumblers")}
                      >
                        Tumblers
                      </button>
                    </li>
                  </ul>
                </li>
                <li>
                  <button
                    className={filter === "Bandanas" ? `active` : ``}
                    onClick={() => setFilter("Bandanas")}
                  >
                    Bandanas
                  </button>
                </li>
                <li>
                  <button
                    className={filter === "Cards" ? `active` : ``}
                    onClick={() => setFilter("Cards")}
                  >
                    Cards
                  </button>
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
                fluid(maxWidth: 500, maxHeight: 500, cropFocus: CENTER) {
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
