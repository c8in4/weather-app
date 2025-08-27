export default async function (weatherData, unitGroup) {
  console.log("displayWeatherData(): ", weatherData)

  const weatherSelector = document.querySelector("#weatherSelector")

  let displayType = "current" // current, today, threeDays

  const weatherDisplayDiv = document.querySelector("#weatherDisplay")
  weatherDisplayDiv.textContent = ""
  weatherDisplayDiv.appendChild(currentWeatherContent(weatherData, unitGroup))
}

function currentWeatherContent(weatherData, unitGroup) {
  console.log(unitGroup)

  const currentWeatherDiv = document.createElement("div")

  const { address, description, currentConditions } = weatherData

  const {
    conditions,
    datetime,
    feelslike,
    humidity,
    icon,
    pressure,
    sunrise,
    sunset,
    temp,
    winddir,
    windspeed,
    windgust,
  } = currentConditions

  const addressPara = document.createElement("p")
  addressPara.textContent = address

  const descriptionPara = document.createElement("p")
  descriptionPara.textContent = description

  const datetimePara = document.createElement("p")
  datetimePara.textContent = `Last update: ${datetime}`

  const feelslikePara = document.createElement("p")
  feelslikePara.textContent = `Feels like: ${feelslike}`

  const humidityPara = document.createElement("p")
  humidityPara.textContent = `Humidity: ${humidity}%`

  const iconImg = document.createElement("img")
  iconImg.alt = conditions
  import(`./assets/weatherIcons/${icon}.svg`).then((icon) => {
    iconImg.src = icon.default
  })

  const pressurePara = document.createElement("p")
  pressurePara.textContent = `Airpressure: ${pressure}hPa`

  const sunrisePara = document.createElement("p")
  sunrisePara.textContent = `Sunrise: ${sunrise}`

  const sunsetPara = document.createElement("p")
  sunsetPara.textContent = `Sunset: ${sunset}`

  const tempPara = document.createElement("p")
  tempPara.textContent = `Temperature: ${temp}`

  const windPara = document.createElement("p")
  windPara.textContent = `Wind: ${winddir}º, ${windspeed} - ${windgust}`

  currentWeatherDiv.append(
    addressPara,
    datetimePara,
    descriptionPara,
    iconImg,
    tempPara,
    feelslikePara,
    humidityPara,
    pressurePara,
    sunrisePara,
    sunsetPara,
    windPara,
  )
  return currentWeatherDiv
}
