import React from "react"
import { SiteProvider } from "./src/components/context"

export const wrapRootElement = ({ element }) => (
  <SiteProvider>{element}</SiteProvider>
)
