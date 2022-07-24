import React from "react"

export const BrandLogo = () => {
  return (
    <h2 className="text-center text-lg font-extrabold text-gray-900 dark-mode:text-gray-400">{process.env.APP_NAME||'Undefined'}</h2>
  )
}