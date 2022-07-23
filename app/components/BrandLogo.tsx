import { Link } from "@remix-run/react"

export const BrandLogo = () => {
  return (
    <Link to={'/'}>
      <h2 className="text-center text-lg font-extrabold text-gray-900 dark-mode:text-gray-400">{process.env.APP_NAME}</h2>
    </Link>
  )
}