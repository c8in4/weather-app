import "./style.css"
import getWeatherData from "./weatherAPI"
import currentWeatherContent from "./currentWeather"

let weatherData

const form = document.querySelector("form")
form.addEventListener("submit", weatherButtonHandler)

async function weatherButtonHandler(event) {
  event.preventDefault()
  const userInputs = getUserInputs()
  if (!userInputs.location) return

  weatherData = await getWeatherData(userInputs.location, userInputs.unitGroup)

  displayWeatherData(userInputs.unitGroup)

  function getUserInputs() {
    const locationInput = document.querySelector("#locationInput")
    const unitGroupSelect = document.querySelector("#unitGroupSelect")

    return { location: locationInput.value, unitGroup: unitGroupSelect.value }
  }
}

async function displayWeatherData(unitGroup) {
  console.log("displayWeatherData(): ", weatherData)

  const weatherDisplayDiv = document.querySelector("#weatherDisplay")
  weatherDisplayDiv.textContent = ""
  weatherDisplayDiv.appendChild(currentWeatherContent(weatherData, unitGroup))
}
