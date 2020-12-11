import React, { useState } from "react"
import { navigate } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 360px);
  h1 {
    color: var(--primary-dark);
    font-family: var(--title-font);
  }
  form {
    width: 480px;
  }
  .form-group {
    margin-bottom: 1.45rem;
  }
  label {
    color: var(--primary-dark);
    display: block;
    font-weight: bold;
  }
  input {
    border: 1px solid var(--primary-light);
    :focus {
      outline-color: var(--accent-dark);
    }
  }
  #name {
    width: 100%;
  }
  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    input {
      width: 235px;
      @media (max-width: 500px) {
        width: 100%;
      }
    }
  }
  textarea {
    border: 1px solid var(--primary-light);
    height: 100px;
    width: 100%;
  }
`
const ButtonWrapper = styled.div`
  border: 4px solid var(--primary-dark);
  height: 74px;
  margin-left: 10px;
  margin-top: 10px;
  width: 320px;
  max-width: 100%;
  margin: 0 auto;

  input[type="submit"] {
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
const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const Contact = () => {
  const [state, setState] = useState({})

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...state,
      }),
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch(error => alert(error))
  }

  return (
    <Layout>
      <SEO title="Contact Penny Bug &amp; Co" />
      <Page>
        <h1>Contact Us</h1>
        <form
          name="contact"
          method="post"
          action="/success/"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="contact" />
          <p hidden>
            <label>
              Don’t fill this out:{" "}
              <input name="bot-field" onChange={handleChange} />
            </label>
          </p>
          <div className="form-group">
            <label for="name">Name</label>
            <input type="text" name="Name" id="name" onChange={handleChange} />
          </div>

          <div className="row">
            <div className="form-group l-inline-block">
              <label for="email">Email</label>
              <input
                type="email"
                name="Email"
                id="email"
                onChange={handleChange}
              />
            </div>

            <div className="form-group l-inline-block">
              <label for="phone">Phone</label>
              <input
                type="tel"
                name="Phone"
                id="phone"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label for="message">Message</label>
            <textarea
              name="Message"
              id="message"
              onChange={handleChange}
            ></textarea>
          </div>

          <ButtonWrapper>
            <input type="submit" value="SEND MESSAGE" />
          </ButtonWrapper>
        </form>
      </Page>
    </Layout>
  )
}

export default Contact
