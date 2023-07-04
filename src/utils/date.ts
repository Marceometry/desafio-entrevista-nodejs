export function resetMinutesAndSeconds(source: Date | string) {
  const date = new Date(source)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
  return date.toISOString()
}
