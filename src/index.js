import "./style.css"

console.log("hello from JS")

// search location
// toggle Fahrenheit or Celsius

// change look of page based on the data
// e.g. color of background or adding images
// use promises or async/await or both

// TOP /////////////////////////////////////////
// Write the functions that hit the API.
// You’re going to want functions that can take a location
// and return the weather data for that location. For now,
// just console.log() the information.

// Write the functions that process the JSON data you’re getting
// from the API and return an object with only the data you require
// for your app.

// Set up a form that will let users input their location and
// will fetch the weather info (still just console.log() it).

// Display the information on your webpage!
//      While you don’t have to, if you wish to display weather
//      icons then there can be a lot of them to import, so have
//      a look at the dynamic import() function. Unlike plain
//      template strings without an import, Webpack can read dynamic
//      imports and still bundle all the relevant assets.

// Add any styling you like!

// Optional: add a ‘loading’ component that displays from the time
// the form is submitted until the information comes back from the
// API. Use DevTools to simulate network speeds.

// Push that baby to GitHub and share your solution below!

let location = "twizel"
let unitGroup = "metric"
// let unitGroup = "us"

async function getWeatherData(location, unitGroup) {
  const API_KEY = "62YSW5FAU63UJ42MCC2AZZYGN"
  const API_URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unitGroup}&key=${API_KEY}&contentType=json`
  try {
    const response = await fetch(API_URL, { mode: "cors" })
    if (!response.ok) {
      throw response
    }
    return await response.json()
  } catch (error) {
    console.error("Error: ", error)
  }
}

getWeatherData(location, unitGroup)
  .then(stripWeatherData)
  .then((response) => {
    console.log(response)
  })

function stripWeatherData(weatherData) {
  return {
    address: weatherData.resolvedAddress,
    description: weatherData.description,
    currentConditions: stripConditions(weatherData.currentConditions),
    days: weatherData.days,
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
