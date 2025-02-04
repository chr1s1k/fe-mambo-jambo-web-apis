import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import { BatteryStatus, Home, PageVisibility, ScreenWakeLock } from "./pages"

import Layout from "./Layout"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/screen-wake-lock" element={<ScreenWakeLock />} />
      <Route path="/page-visibility" element={<PageVisibility />} />
      <Route path="/battery-status" element={<BatteryStatus />} />
    </Route>,
  ),
)

function App() {
  return <RouterProvider router={router} />
}

export default App
