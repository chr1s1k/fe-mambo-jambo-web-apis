import { useId, useRef } from "react"

type Props = {
  imageUrl: string
  url: string
}

export default function ModalQR({ imageUrl, url }: Props) {
  const id = useId()
  const modalRef = useRef<HTMLDialogElement>(null)

  const openModal = () => modalRef.current?.showModal()

  return (
    <>
      <button
        type="button"
        className="btn btn-xs btn-ghost btn-circle"
        aria-label="Display URL of the page as QR code"
        onClick={openModal}
      >
        🔗
      </button>
      <dialog id={id} className="modal" ref={modalRef}>
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              aria-label="Close dialog"
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-2">Scan me</h3>
          <div className="text-center">
            <div className="avatar">
              <div className="rounded">
                <img src={imageUrl} alt={url} width="450" height="450" />
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  )
}
