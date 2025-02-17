import clsx from "clsx"
import { useEffect, useRef, useState } from "react"
import { ModalQR } from "../components"

let playingOnHide = false

export default function PageVisibility() {
  const [audioAutoPause, setAudioAutoPause] = useState(false)
  const audio = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (!audioAutoPause) return

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // save the current state of the audio player when the page is hidden
        playingOnHide = !audio.current?.paused
        audio.current?.pause()
      } else {
        if (playingOnHide) {
          audio.current?.play()
        }
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    // cleanup
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [audioAutoPause])

  return (
    <>
      <div className="flex flex-wrap gap-2 items-center mb-6">
        <h1>Page Visibility API</h1>
        <ModalQR
          imageUrl="/assets/images/page-visibility-qrcode.png"
          url="https://fe-mambo-jambo-web-apis.vercel.app/page-visibility"
        />
      </div>
      <section>
        <h2 className="text-2xl mb-4">Music player</h2>
        <div className="mb-4">
          <label htmlFor="autoPauseAudio" className="flex items-center gap-2 cursor-pointer">
            <input
              id="autoPauseAudio"
              type="checkbox"
              checked={audioAutoPause}
              className={clsx("toggle toggle-xl", {
                "toggle-success": audioAutoPause,
              })}
              onChange={() => setAudioAutoPause((prev) => !prev)}
            />
            <span>Automatically pause the sound when the page is hidden</span>
          </label>
        </div>
        <audio src="/assets/sw-the-imperial-march.mp3" className="w-full" ref={audio} controls />
      </section>
      {/* ----------------------------------------------------------------------------------- */}
    </>
  )
}
