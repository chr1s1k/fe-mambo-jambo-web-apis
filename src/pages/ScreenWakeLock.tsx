import { useRef, useState } from "react"
import clsx from "clsx"

export default function ScreenWakeLock() {
  const isSupported = "wakeLock" in navigator

  // create a reference for the Wake Lock sentinel
  const wakeLock = useRef<WakeLockSentinel | null>(null)

  // create a state for the released status
  const [released, setReleased] = useState<boolean | undefined>(undefined)

  const requestWakeLock = async () => {
    if (!isSupported) {
      console.error("Screen Wake Lock API is not supported in this browser.")
      return
    }

    try {
      wakeLock.current = await navigator.wakeLock.request("screen")
      setReleased(wakeLock.current.released)

      wakeLock.current.addEventListener("release", () => {
        setReleased(wakeLock.current?.released)
      })
    } catch (err) {
      console.error(`Wake Lock request failed: ${err}`)
    }
  }

  const releaseWakeLock = async () => {
    wakeLock.current && (await wakeLock.current.release())
  }

  return (
    <>
      <h1>Screen Wake Lock API</h1>
      <p className="mb-8">
        {isSupported ? (
          <>
            🎉 Hooray! Your browser <strong>supports</strong> Screen Wake Lock API.
          </>
        ) : (
          <>
            ⛔ Your browser <strong>doesn't support</strong> Screen Wake Lock API.
          </>
        )}
      </p>
      {isSupported ? (
        <>
          <button
            className={clsx("btn btn-lg", released === false ? "btn-error" : "btn-primary")}
            onClick={released === false ? releaseWakeLock : requestWakeLock}
          >
            Turn Screen Wake Lock {released === false ? "OFF" : "ON"}
          </button>
          {/* <div className="mt-8">
            <label htmlFor="wakeLock" className="flex items-center gap-2 cursor-pointer">
              <input
                id="wakeLock"
                type="checkbox"
                checked={released === false}
                className={clsx("toggle toggle-xl", {
                  "toggle-success": released === false,
                })}
                onChange={released === false ? releaseWakeLock : requestWakeLock}
              />
              <span>Prevent my screen from turning off</span>
            </label>
          </div> */}
          <div className="flex items-center mt-8 gap-2">
            <h2 className="text-xl">Wake Lock Status:</h2>
            <div
              className={clsx("status rounded-full size-6", {
                "status-success": released === false,
                "status-error": released,
              })}
            ></div>
            <span>
              {released === undefined && "Not requested"}
              {released === false && "Active"}
              {released && "Released"}
            </span>
          </div>
        </>
      ) : null}
    </>
  )
}
