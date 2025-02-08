import { ModalQR } from "../components"

export default function BatteryStatus() {
  return (
    <>
      <div className="flex flex-wrap gap-2 items-center mb-6">
        <h1>Battery Status API</h1>
        <ModalQR
          imageUrl="/assets/images/battery-status-qrcode.png"
          url="https://fe-mambo-jambo-web-apis.vercel.app/battery-status"
        />
      </div>
    </>
  )
}
