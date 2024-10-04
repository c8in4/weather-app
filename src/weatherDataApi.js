const apiKey = "62YSW5FAU63UJ42MCC2AZZYGN"

export async function getWeatherData(location, unitGroup) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unitGroup}&key=${apiKey}&contentType=json`

  try {
    const response = await fetch(url, { mode: "cors" })
    if (!response.ok) {
      throw new Error("Response status: " + response.status)
    }
    const json = await response.json()
    // console.log(json)
    return json
  } catch (error) {
    alert(`The location "${location}" could not be found.`)
    console.log(error)
  }
}
