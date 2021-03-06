import React, { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import { Dialog } from "@reach/dialog"
import "@reach/dialog/styles.css"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Carousel from "../components/Carousel"

import { SiteContext } from "../components/context"

import swirl from "../images/product-swirl.png"
import bottomFlower from "../images/product-flower-bottom.png"

const SwirlContainer = styled.div`
  background-image: url(${swirl});
  background-size: 100%;
  background-repeat: no-repeat;

  .flower {
    margin-top: -75px;
    position: absolute;
    right: 0;
    z-index: 11;

    @media (max-width: 500px) {
      display: none;
    }
  }
`

const Wrapper = styled.div`
  color: var(--primary-dark);
  width: 1600px;
  max-width: 100%;
  margin: 0 auto;
  margin-bottom: 3rem;

  h1 {
    color: var(--primary-dark);
    font-family: var(--title-font);
    font-size: 5rem;
    letter-spacing: 2px;

    @media (max-width: 767px) {
      font-size: 3rem;
    }
  }

  .price {
    font-family: var(--button-font-fat);
    font-size: 2rem;
    font-weight: bold;
  }

  form {
    width: 480px;
    max-width: 100%;
    div {
      margin-bottom: 1.45rem;
    }
  }

  .select-label {
    justify-content: center;
  }

  select {
    border: 1px solid var(--primary-light);
    border-radius: 4px;
    color: var(--primary-dark);
    padding: 5px;
  }

  textarea {
    border: 1px solid var(--primary-light);
    border-radius: 4px;
    margin-top: 1rem;
    width: 100%;
    height: 200px;
  }

  label {
    display: block;
    font-size: 2rem;
    line-height: 1;
  }

  .button-wrapper {
    border: 4px solid var(--primary-dark);
    height: 74px;
    margin-left: 10px;
    margin-top: 10px;
  }

  input[type="button"] {
    background-color: var(--primary-dark);
    border-radius: 0;
    border: 0;
    color: var(--accent-light);
    display: block;
    font-family: var(--button-font-fat);
    font-size: 2rem;
    padding: 20px;
    width: 100%;
    margin-top: -10px;
    margin-left: -10px;
  }
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`
const Col = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  &.carousel,
  &.details {
    @media (min-width: 768px) {
      max-width: 50%;
    }
  }
  &.padded {
    padding: 60px;
    @media (max-width: 767px) {
      padding: 15px;
      &.carousel {
        padding-left: 30px;
      }
    }
  }
  &.small-100 {
    @media (max-width: 767px) {
      max-width: 100%;
    }
  }
  &.details {
    @media (max-width: 767px) {
      margin-top: 80px;
    }
  }
`
const updateSelectedVariant = (e, setState) => {
  const { name, value } = e.target
  setState(prevState => ({
    ...prevState,
    [name]: value,
  }))
}
const createMarkup = markup => {
  return { __html: markup }
}

const Product = ({ data }) => {
  const { pushToCart, getCart } = useContext(SiteContext)
  const product = data.productsJson
  const [selectedVariants, setSelectedVariants] = useState(null)
  const [lineItemID, setLineItemID] = useState(0)
  const [customization, setCustomization] = useState("")
  const [buttonText, setButtonText] = useState("ADD TO CART")
  const [showDialog, setShowDialog] = useState(false)
  const [dialogContent, setDialogContent] = useState(product.images[0])

  useEffect(() => {
    //set initial selected variants
    if (selectedVariants === null && product.variants) {
      const initial_variants = {}
      for (let i = 0; i < product.variants.length; i++) {
        const variant = product.variants[i]
        initial_variants[variant.option_name] = variant.options[0]
      }
      setSelectedVariants(initial_variants)
    }

    ;(async () => {
      const cart = await getCart()
      if (cart && cart.lineItems.length) {
        setLineItemID(cart.lineItems.length)
      }
    })()
  }, [selectedVariants, product.variants, getCart])

  const addToCart = () => {
    pushToCart({
      id: lineItemID,
      variants: selectedVariants,
      customization,
      slug: product.slug,
      image: product.images[0],
      title: product.title,
      price: product.price,
      stripeId: product.id,
    })
    setLineItemID(lineItemID + 1)
    setButtonText("ADDED!")
    setCustomization("")
    setTimeout(() => {
      setButtonText("ADD TO CART")
    }, 2000)
  }

  const openDialog = slide => {
    setDialogContent(slide)
    setShowDialog(true)
  }

  return (
    <Layout>
      <SEO title={product.title} />
      <SwirlContainer>
        <Wrapper>
          <Row>
            <Col className="padded small-100 carousel">
              <Carousel slides={product.images} openDialog={openDialog} />
            </Col>
            <Col className="padded small-100 details">
              <h1>{product.title}</h1>
              <p
                className="description"
                dangerouslySetInnerHTML={createMarkup(product.description)}
              />
              <p className="price">${product.price} USD</p>
              <form>
                {product.variants &&
                  product.variants.map((variant, index) => (
                    <Row key={variant + "-" + index}>
                      <Col className="select-label">
                        <label htmlFor={variant.option_name}>
                          {variant.option_name}
                        </label>
                      </Col>
                      <Col>
                        <select
                          id={variant.option_name}
                          name={variant.option_name}
                          onChange={e =>
                            updateSelectedVariant(e, setSelectedVariants)
                          }
                        >
                          {variant.options.map(option => (
                            <option value={option} key={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </Col>
                    </Row>
                  ))}
                {product.customization && (
                  <div>
                    <label htmlFor={product.customization.title}>
                      {product.customization.title}
                    </label>
                    <textarea
                      id={product.customization.title}
                      name={product.customization.title}
                      value={customization}
                      maxLength={product.customization.character_cap}
                      placeholder={`Max length: ${product.customization.character_cap}`}
                      onChange={e => setCustomization(e.target.value)}
                    ></textarea>
                  </div>
                )}
                <div className="button-wrapper">
                  <input type="button" value={buttonText} onClick={addToCart} />
                </div>
              </form>
            </Col>
          </Row>
        </Wrapper>
        <img src={bottomFlower} alt="decorative flower" className="flower" />
        <Dialog
          isOpen={showDialog}
          onDismiss={() => setShowDialog(false)}
          aria-label="pop up with full sized image"
        >
          <Img
            fixed={dialogContent.src.childImageSharp.fixed}
            alt={dialogContent.alt}
          />
          <button className="close-button" onClick={() => setShowDialog(false)}>
            &times; close
          </button>
        </Dialog>
      </SwirlContainer>
    </Layout>
  )
}

export default Product

export const query = graphql`
  query($slug: String!) {
    productsJson(slug: { eq: $slug }) {
      id
      title
      description
      price
      slug
      images {
        src {
          id
          childImageSharp {
            fluid(maxWidth: 600, maxHeight: 600, cropFocus: CENTER) {
              ...GatsbyImageSharpFluid
            }
            fixed(width: 1000) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        alt
      }
      variants {
        option_name
        options
      }
      customization {
        title
        character_cap
      }
    }
  }
`
