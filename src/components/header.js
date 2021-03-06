import { Link } from "gatsby"
import React, { useContext } from "react"
import styled from "styled-components"
import { SiteContext } from "./context"
import cartIcon from "../images/cart-icon.png"
import hamburger from "../images/hamburger.png"

const StyledHeader = styled.header`
  background-color: var(--primary-medium);
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  letter-spacing: 3px;
  padding: 10px;
  width: 100%;
  max-width: 100vw;
  z-index: 13;
  position: fixed;
  @media (max-width: 767px) {
    justify-content: space-between;
  }

  .h1 {
    border-right: 1px solid #fff;
    color: #fff;
    font-family: var(--button-font-fat);
    font-size: 2rem;
    padding-right: 30px;
    margin-bottom: 0;
    @media (max-width: 991px) {
      padding-right: 15px;
      font-size: 1.5rem;
    }
    @media (max-width: 767px) {
      border-right: 0;
      padding-right: 0;
    }
    @media (max-width: 500px) {
      font-size: 1.2rem;
    }
  }

  .s-hide {
    @media (max-width: 767px) {
      display: none;
    }
  }

  ul {
    display: flex;
    margin-bottom: 0;
    @media (max-width: 991px) {
      margin-left: 0;
    }
  }

  li {
    display: flex;
    list-style-type: none;
    padding: 10px;
    margin-bottom: 0;
    align-items: center;

    &.image-link {
      padding-top: 0;
      padding-bottom: 0;
    }
  }

  a {
    color: var(--accent-light);
    display: flex;
    font-family: var(--button-font);
    font-weight: bold;
    font-size: 1.2rem;
    text-decoration: none;
  }

  img {
    height: 1.2rem;
  }

  .burger-wrapper {
    align-self: flex-end;
    @media (min-width: 768px) {
      display: none;
    }
    button {
      background-color: transparent;
      border: 0;

      img {
        margin-bottom: 0;
      }
    }
  }
`
const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  flex: ${props => (props.flex ? props.flex : "none")};
  justify-content: ${props => (props.justify ? props.justify : "center")};
  align-items: ${props => (props.align ? props.align : "center")};

  &.heading-wrapper {
    @media (max-width: 1517px) {
      flex: 1;
    }
    @media (max-width: 1143px) {
      flex: 1;
    }
    @media (max-width: 767px) {
      flex: none;
    }
  }

  &.nav-wrapper {
    @media (max-width: 1517px) {
      flex: 2;
    }
    @media (max-width: 1143px) {
      flex: 1.5;
    }
    @media (max-width: 991px) {
      flex: 1;
    }
    @media (max-width: 767px) {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      padding-top: 5px;
    }
  }
`

const Header = ({ page }) => {
  const { isDrawerOpen, setIsDrawerOpen } = useContext(SiteContext)
  return (
    <StyledHeader>
      <GridItem className="heading-wrapper" flex={1}>
        {page === "home" ? (
          <h1 className="h1">PENNY BUG &amp; CO.</h1>
        ) : (
          <div className="h1">PENNY BUG &amp; CO.</div>
        )}
      </GridItem>
      <GridItem className="nav-wrapper" flex={3} align="flex-start">
        <nav aria-label="Primary">
          <ul>
            <li className="s-hide">
              <Link to="/">HOME</Link>
            </li>
            <li className="s-hide">
              <Link to="/products">SHOP</Link>
            </li>
            <li className="s-hide">
              <Link to="/contact">CONTACT</Link>
            </li>
            <li className="image-link">
              <Link to="/cart">
                <img src={cartIcon} alt="Shopping Cart" />
              </Link>
            </li>
          </ul>
        </nav>
        <div className="burger-wrapper">
          <button onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
            <img src={hamburger} alt="menu button" />
          </button>
        </div>
      </GridItem>
    </StyledHeader>
  )
}

export default Header
