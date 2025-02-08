import { Link } from "react-router-dom"

export default function Home() {
  return (
    <>
      <h1 className="mb-6">Examples</h1>
      <ol className="list-decimal pl-5">
        <li className="border-b border-solid border-gray-500">
          <Link to="/screen-wake-lock" className="block px-2 py-3">
            Screen Wake Lock API
          </Link>
        </li>
        <li className="border-b border-solid border-gray-500">
          <Link to="/page-visibility" className="block px-2 py-3">
            Page Visibility API
          </Link>
        </li>
        <li>
          <Link to="/battery-status" className="block px-2 py-3">
            Battery Status API
          </Link>
        </li>
      </ol>
    </>
  )
}
