const apiKey = "62YSW5FAU63UJ42MCC2AZZYGN"

export async function getWeatherData(location, unitGroup) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unitGroup}&key=${apiKey}&contentType=json`

  try {
    const response = await fetch(url, { mode: "cors" })
    const data = await response.json()
    // console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}
