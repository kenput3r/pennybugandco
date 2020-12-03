import React, { createContext, useState } from "react"

export const SiteContext = createContext({})

export const SiteProvider = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <SiteContext.Provider
      value={{
        isDrawerOpen,
        setIsDrawerOpen,
      }}
    >
      {children}
    </SiteContext.Provider>
  )
}
