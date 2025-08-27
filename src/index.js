import "./style.css"
import getWeatherData from "./weatherAPI"
import displayWeatherData from "./displayWeatherData"

export let weatherData
export let unitGroup
let displayType = "current"

const form = document.querySelector("form")
form.addEventListener("submit", weatherButtonHandler)

const weatherSelector = document.querySelector("#weatherSelector")
weatherSelector.addEventListener("click", getWeatherType)

function getWeatherType(event) {
  displayType = event.target.dataset.type
  if (weatherData) updateWeatherContent()
}

async function updateWeatherContent() {
  const weatherDisplayDiv = document.querySelector("#weatherDisplay")
  weatherDisplayDiv.textContent = ""

  const weatherContent = await displayWeatherData()

  let newContent

  switch (displayType) {
    case "current":
      newContent = weatherContent.currentWeatherContent
      break
    case "today":
      newContent = weatherContent.todaysWeatherContent
      break
    case "threeDays":
      newContent = weatherContent.threeDaysWeatherContent
      break
    default:
      break
  }
  try {
    weatherDisplayDiv.appendChild(newContent)
  } catch (error) {
    console.error("error updating content", error)
  }
}

async function weatherButtonHandler(event) {
  event.preventDefault()
  const userInputs = getUserInputs()
  if (!userInputs.location) return

  weatherData = await getWeatherData(userInputs.location, userInputs.unitGroup)

  updateWeatherContent()

  function getUserInputs() {
    const locationInput = document.querySelector("#locationInput")
    const unitGroupSelect = document.querySelector("#unitGroupSelect")
    unitGroup = unitGroupSelect.value

    return { location: locationInput.value, unitGroup: unitGroupSelect.value }
  }
}
