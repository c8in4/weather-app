// import dropDownMenu from "@c8in4/drop-down-npm"
import { getWeatherData } from "./weatherDataApi"
import "./style.css"

// dropDownMenu("menu")

const locationInput = document.querySelector("#location")
const button = document.querySelector("#button")
let unitGroup = "metric"
// "us" or "metric"
let tempUnit
let windUnit

button.addEventListener("click", (e) => {
  e.preventDefault()
  const location = locationInput.value || "London"
  unitGroup = document.querySelector("select").value
  if (unitGroup == "metric") {
    tempUnit = "C"
    windUnit = "km/h"
  } else if (unitGroup == "us") {
    tempUnit = "F"
    windUnit = "mph"
  }
  getWeatherData(location, unitGroup).then(displayCurrentConditions)
})

function displayCurrentConditions(data) {
  const currentConditions = data.currentConditions

  console.group("Fetched data")
  console.log(data)
  console.groupEnd()

  console.log(data.resolvedAddress)
  const locationPara = document.querySelector("#currentLocation")
  locationPara.textContent = data.resolvedAddress

  console.group("Current Conditions")
  console.log(currentConditions)

  const lastUpdate = document.querySelector("#lastUpdate")
  console.log("Last Update: " + currentConditions.datetime)
  lastUpdate.textContent = "Last Update: " + currentConditions.datetime

  const conditions = document.querySelector("#conditions")
  console.log("Conditions: " + currentConditions.conditions)
  conditions.textContent =
    "Conditions: " +
    currentConditions.conditions +
    " (~" +
    currentConditions.cloudcover +
    "%)"

  const description = document.querySelector("#description")
  console.log(data.description)
  description.textContent = "Info: " + data.description

  const temperature = document.querySelector("#temperature")
  console.log("Temperature: " + currentConditions.temp)
  temperature.textContent =
    "Temperature: " + currentConditions.temp + " º" + tempUnit

  const pressure = document.querySelector("#pressure")
  console.log("Pressure: " + currentConditions.pressure)
  pressure.textContent = "Pressure: " + currentConditions.pressure + "hPa"

  const windDir = document.querySelector("#windDirection")
  console.log("Wind Direction: " + currentConditions.winddir)
  windDir.textContent = "Wind Direction: " + currentConditions.winddir

  const windSpeed = document.querySelector("#windSpeed")
  console.log("Wind Speed: " + currentConditions.windspeed)
  windSpeed.textContent =
    "Wind Speed: " + currentConditions.windspeed + " " + windUnit

  const windGust = document.querySelector("#windGust")
  console.log("Wind Gust: " + currentConditions.windgust)
  windGust.textContent =
    "Wind Gust: " + currentConditions.windgust + " " + windUnit

  const sunrise = document.querySelector("#sunrise")
  console.log("Sunrise: " + currentConditions.sunrise)
  sunrise.textContent = "Sunrise: " + currentConditions.sunrise

  const sunset = document.querySelector("#sunset")
  console.log("Sunset: " + currentConditions.sunset)
  sunset.textContent = "Sunset: " + currentConditions.sunset

  console.log("Humidity: " + currentConditions.humidity)
  console.groupEnd()
}
