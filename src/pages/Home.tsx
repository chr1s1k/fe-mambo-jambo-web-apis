import { Link } from "react-router-dom"

export default function Home() {
  return (
    <>
      <h1>Examples</h1>
      <ol className="list-decimal list-inside">
        <li className="list__item">
          <Link to="/screen-wake-lock" className="list__link">
            Screen Wake Lock API
          </Link>
        </li>
        <li className="list__item">
          <Link to="/page-visibility" className="list__link">
            Page Visibility API
          </Link>
        </li>
        <li className="list__item">
          <Link to="/battery-status" className="list__link">
            Battery Status API
          </Link>
        </li>
      </ol>
    </>
  )
}
