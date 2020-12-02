import React from "react"
import Img from "gatsby-image"
import styled from "styled-components"
import Slider from "react-slick"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const Container = styled.div`
  padding-top: 20px;
  width: 600px;
  max-width: 100%;
  margin: 0 auto;

  .wrapper {
    background-color: var(--accent-dark);
    .spacer {
      background-color: #fff;
      width: 100%;
      height: 20px;
    }
    .slick-slider {
      margin-left: -20px;
      margin-top: -20px;
      padding-right: 20px;
      padding-bottom: 10px;
    }
  }

  .slick-dots.slick-thumb {
    bottom: -98px;
    li {
      width: 80px;
      height: 80px;
    }
  }
`

const Carousel = ({ slides }) => {
  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <Img
            fluid={slides[i].src.childImageSharp.fluid}
            alt={slides[i].alt}
            key={slides[i].src.id}
          />
        </a>
      )
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
  return (
    <Container>
      <div className="wrapper">
        <div className="spacer"></div>
        <Slider {...settings}>
          {slides.map(slide => (
            <div key={slide.src.id}>
              <Img fluid={slide.src.childImageSharp.fluid} alt={slide.alt} />
            </div>
          ))}
        </Slider>
      </div>
    </Container>
  )
}

export default Carousel
