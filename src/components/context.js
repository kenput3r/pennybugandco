import React, { createContext, useState } from "react"

export const SiteContext = createContext({})

const isBrowser = typeof window !== "undefined"

const getCart = () => {
  const items = localStorage.getItem("cartItems")
  const cartItems = JSON.parse(items)
  console.log(items)
  return Promise.resolve(cartItems)
}

const pushToCart = async item => {
  const items = localStorage.getItem("cartItems")
  if (items) {
    const cartItems = JSON.parse(items)
    cartItems["lineItems"].push(item)
    const itemsJSON = JSON.stringify(cartItems)
    localStorage.setItem("cartItems", itemsJSON)
  } else {
    const itemsJSON = JSON.stringify({ lineItems: [item] })
    localStorage.setItem("cartItems", itemsJSON)
  }
  return Promise.resolve("item added")
}

export const SiteProvider = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <SiteContext.Provider
      value={{
        isDrawerOpen,
        setIsDrawerOpen,
        getCart,
        isBrowser,
        pushToCart,
      }}
    >
      {children}
    </SiteContext.Provider>
  )
}
