/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useState } from "react"
import { secondsToHumanReadable } from "../utils"

declare global {
  interface Navigator {
    getBattery(): Promise<Battery>
  }
}

type Battery = Omit<
  BatteryState,
  "isSupported" | "chargingTimeFormatted" | "dischargingTimeFormatted"
> &
  EventTarget

type BatteryState = {
  charging: boolean
  level: number
  chargingTime: number | null
  dischargingTime: number | null
  isSupported: boolean
  chargingTimeFormatted: string
  dischargingTimeFormatted: string
}

const initialState: BatteryState = {
  charging: false,
  level: 0,
  chargingTime: null,
  dischargingTime: null,
  isSupported: false,
  chargingTimeFormatted: "",
  dischargingTimeFormatted: "",
}

export function useBattery() {
  const [batteryState, setBatteryState] = useState<BatteryState>(initialState)

  const formatChargingTime = ({ charging, chargingTime }: Battery) => {
    if (charging && chargingTime === Infinity) {
      return "Calculating..."
    } else if (chargingTime !== Infinity) {
      return secondsToHumanReadable(chargingTime)
    } else {
      return "---"
    }
  }

  const formatDischargingTime = ({ charging, dischargingTime }: Battery) => {
    if (!charging && dischargingTime === Infinity) {
      return "Calculating..."
    } else if (dischargingTime !== Infinity) {
      return secondsToHumanReadable(dischargingTime)
    } else {
      return "---"
    }
  }

  useEffect(() => {
    const getBattery = async () => {
      if (!("getBattery" in navigator) && typeof window !== "undefined") {
        setBatteryState({ ...batteryState, isSupported: false })
        return
      }

      try {
        const battery = await navigator.getBattery()

        const updateBatteryInfo = () => {
          setBatteryState({
            charging: battery.charging,
            level: Math.floor(battery.level * 100),
            chargingTime: battery.chargingTime,
            dischargingTime: battery.dischargingTime,
            isSupported: true,
            chargingTimeFormatted: formatChargingTime(battery),
            dischargingTimeFormatted: formatDischargingTime(battery),
          })
        }

        // initial update
        updateBatteryInfo()

        // listen for changes
        battery.addEventListener("chargingchange", updateBatteryInfo)
        battery.addEventListener("levelchange", updateBatteryInfo)
        battery.addEventListener("chargingtimechange", updateBatteryInfo)
        battery.addEventListener("dischargingtimechange", updateBatteryInfo)

        // cleanup
        return () => {
          battery.removeEventListener("chargingchange", updateBatteryInfo)
          battery.removeEventListener("levelchange", updateBatteryInfo)
          battery.removeEventListener("chargingtimechange", updateBatteryInfo)
          battery.removeEventListener("dischargingtimechange", updateBatteryInfo)
        }
      } catch (error) {
        setBatteryState({ ...batteryState, isSupported: false })
      }
    }

    getBattery()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return batteryState
}
