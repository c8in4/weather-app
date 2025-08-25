import "./style.css"
import getWeatherData from "./weatherAPI"
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

// TODO:
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

function getUserInputs() {
  const locationInput = document.querySelector("#locationInput")
  const unitGroupSelect = document.querySelector("#unitGroupSelect")
  console.log(locationInput, unitGroupSelect)

  return { location: locationInput.value, unitGroup: unitGroupSelect.value }
}

const weatherData = getWeatherData(location, unitGroup)

weatherData.then(console.log)
