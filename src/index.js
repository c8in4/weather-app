import "./style.css"
import getWeatherData from "./weatherAPI"
import createCurrentWeatherContent from "./createWeatherContent"

export let weatherData
export let unitGroup
let displayType = "current"

const form = document.querySelector("form")
form.addEventListener("submit", weatherButtonHandler)

const weatherSelector = document.querySelector("#weatherSelector")
weatherSelector.addEventListener("click", getWeatherType)

function getWeatherType(event) {
  displayType = event.target.dataset.type
  updateWeatherContent()
}

async function updateWeatherContent() {
  try {
    if (!weatherData) {
      throw new Error("missing weather data.")
    }
    const weatherDisplayDiv = document.querySelector("#weatherDisplay")
    weatherDisplayDiv.textContent = ""

    const weatherContent = await createCurrentWeatherContent()

    let newContent

    switch (displayType) {
      case "current":
        newContent = weatherContent.currentWeatherContent
        break
      case "today":
        newContent = weatherContent.todaysWeatherContent
        break
      case "fourteenDays":
        newContent = weatherContent.fourteenDaysWeatherContent
        break
      default:
        break
    }

    newContent.forEach((thing) => {
      weatherDisplayDiv.appendChild(thing)
    })
  } catch (error) {
    console.error("error updating content", error)
  }
}

async function weatherButtonHandler(event) {
  event.preventDefault()

  const weatherDisplayDiv = document.querySelector("#weatherDisplay")
  weatherDisplayDiv.textContent = "Loading..."

  const userInputs = getUserInputs()
  if (!userInputs.location) return

  try {
    weatherData = await getWeatherData(
      userInputs.location,
      userInputs.unitGroup,
    )
    if (!weatherData) throw new Error("No weather data retrieved")
  } catch (error) {
    weatherDisplayDiv.textContent = error
    console.error(error)
  }

  updateWeatherContent()

  function getUserInputs() {
    const locationInput = document.querySelector("#locationInput")
    const unitGroupSelect = document.querySelector("#unitGroupSelect")
    unitGroup = unitGroupSelect.value

    return { location: locationInput.value, unitGroup: unitGroupSelect.value }
  }
}
