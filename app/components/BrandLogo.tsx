import React from "react"
import config from "../env.config"

export const BrandLogo = () => {
  return <h2 className="text-center text-lg font-extrabold text-gray-900 dark-mode:text-gray-400">
    {config.SITE_NAME||'Logo'}
  </h2>
}