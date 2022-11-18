export const currentTimeToLocale = (lng) => {
  return new Date().toLocaleDateString(lng, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  })
}