export default async function getWeatherData(location, unitGroup) {
  const API_KEY = "62YSW5FAU63UJ42MCC2AZZYGN"
  const API_URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unitGroup}&key=${API_KEY}&contentType=json`
  try {
    const response = await fetch(API_URL, { mode: "cors" })
    if (!response.ok) {
      throw response
    }
    const weatherData = await response.json()
    console.log("weatherAPI - full weather data: ", weatherData)
    return stripWeatherData(weatherData)
  } catch (error) {
    console.error("Weather API Error:", error)
  }
}

function stripWeatherData(weatherData) {
  return {
    address: weatherData.resolvedAddress,
    description: weatherData.description,
    currentConditions: stripConditions(weatherData.currentConditions),
    days: weatherData.days, // all data,
    // days: weatherData.days.map((day) => stripConditions(day)),
  }
}

function stripConditions(currentConditions) {
  return {
    datetime: currentConditions.datetime,
    conditions: currentConditions.conditions,
    icon: currentConditions.icon,
    temp: currentConditions.temp,
    feelslike: currentConditions.feelslike,
    humidity: currentConditions.humidity,
    pressure: currentConditions.pressure,
    sunrise: currentConditions.sunrise,
    sunset: currentConditions.sunset,
    winddir: currentConditions.winddir,
    windspeed: currentConditions.windspeed,
    windgust: currentConditions.windgust,
  }
}
