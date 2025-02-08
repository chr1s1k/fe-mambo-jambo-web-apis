import clsx from "clsx"
import { ModalQR } from "../components"
import { useBattery } from "../hooks"

export default function BatteryStatus() {
  const { isSupported, charging, chargingTimeFormatted, dischargingTimeFormatted, level } =
    useBattery()

  return (
    <>
      <div className="flex flex-wrap gap-2 items-center mb-6">
        <h1>Battery Status API</h1>
        <ModalQR
          imageUrl="/assets/images/battery-status-qrcode.png"
          url="https://fe-mambo-jambo-web-apis.vercel.app/battery-status"
        />
      </div>
      <p className="mb-8">
        {isSupported ? (
          <>
            🎉 Hooray! Your browser <strong>supports</strong> Battery Status API.
          </>
        ) : (
          <>
            ⛔ Your browser <strong>doesn't support</strong> Battery Status API.
          </>
        )}
      </p>
      {isSupported ? (
        <>
          <div className="text-center">
            <div className="inline-flex items-center space-x-1 mb-4">
              <div className="relative w-32 h-12 border-2 border-white rounded-md overflow-hidden">
                <div
                  className={clsx("absolute top-0 left-0 h-full", {
                    "bg-green-500": level > 50,
                    "bg-yellow-500": level > 20 && level <= 50,
                    "bg-red-500": level <= 20,
                  })}
                  style={{ width: `${level}%` }}
                ></div>
              </div>
              <div className="w-2 h-6 bg-white rounded-r-md"></div>
            </div>
          </div>
          <div className="text-center">
            <div className="stats stats-vertical md:stats-horizontal">
              <div className="stat">
                <div className="stat-title">Power Source</div>
                <div className="stat-value">{charging ? "Power Adapter" : "Battery"}</div>
              </div>

              <div className="stat">
                <div className="stat-title">Battery Level</div>
                <div className="stat-value">{level}%</div>
              </div>

              <div className="stat">
                <div className="stat-title">Remaining Battery Time</div>
                <div className="stat-value">{dischargingTimeFormatted}</div>
              </div>

              <div className="stat">
                <div className="stat-title">Fully Charged in</div>
                <div className="stat-value">{chargingTimeFormatted}</div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}
