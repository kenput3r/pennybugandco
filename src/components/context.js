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

const removeFromCart = id => {
  const items = localStorage.getItem("cartItems")
  const cartItems = JSON.parse(items)
  console.log(cartItems)
  const index = cartItems.lineItems.findIndex(item => item.id === id)
  console.log(index)
  cartItems.lineItems.splice(index, 1)
  console.log(cartItems)
  const itemsJSON = JSON.stringify(cartItems)
  localStorage.setItem("cartItems", itemsJSON)
  return Promise.resolve("cart updated")
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
        removeFromCart,
      }}
    >
      {children}
    </SiteContext.Provider>
  )
}
