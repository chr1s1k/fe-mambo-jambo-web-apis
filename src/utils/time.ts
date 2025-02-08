export function secondsToHumanReadable(seconds: number | null, includeSeconds = false): string {
  if (!seconds) return "---"

  // Calculate hours, minutes, and seconds
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  // Format the result as HH:MM:SS
  const formattedHours = String(hours).padStart(2, "0")
  const formattedMinutes = String(minutes).padStart(2, "0")
  const formattedSeconds = String(remainingSeconds).padStart(2, "0")

  return includeSeconds
    ? `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
    : `${formattedHours}:${formattedMinutes}`
}
