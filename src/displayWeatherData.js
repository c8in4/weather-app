import { weatherData, unitGroup } from "."

export default async function () {
  const unit = {}
  switch (unitGroup) {
    case "metric":
      unit.temperature = "C"
      unit.speed = "km/h"
      break
    case "us":
      unit.temperature = "F"
      unit.speed = "miles/h"
      break

    default:
      break
  }
  return {
    currentWeatherContent: createCurrentWeatherContent(unit),
    todaysWeatherContent: createTodaysWeatherContent(unit),
    threeDaysWeatherContent: createThreeDaysWeatherContent(unit),
  }
}

function createCurrentWeatherContent(unit) {
  const weatherContentDiv = document.createElement("div")
  weatherContentDiv.classList.add = "currentWeather"

  const { address, description } = weatherData

  const {
    conditions,
    datetime,
    feelslike,
    humidity,
    icon,
    pressure,
    temp,
    winddir,
    windspeed,
    windgust,
  } = weatherData.currentConditions

  const addressHeader = document.createElement("h2")
  addressHeader.textContent = address
  const descriptionPara = createParagraph(description)
  const datetimePara = createParagraph(`Last update: ${datetime}`)
  const feelslikePara = createParagraph(
    `Feels like: ${feelslike} º${unit.temperature}`,
  )
  const humidityPara = document.createElement("p")
  humidityPara.textContent = `Humidity: ${humidity}%`

  const iconImg = document.createElement("img")
  iconImg.alt = icon
  import(`./assets/weatherIcons/${icon}.svg`).then((iconSvg) => {
    iconImg.src = iconSvg.default
  })

  const conditionsPara = createParagraph(`Conditions: ${conditions}`)
  const pressurePara = createParagraph(`Airpressure: ${pressure} hPa`)
  const tempPara = createParagraph(`Temperature: ${temp} º${unit.temperature}`)
  const windPara = createParagraph(
    `Wind: ${winddir}º, ${windspeed} - ${windgust} ${unit.speed}`,
  )

  weatherContentDiv.append(
    addressHeader,
    descriptionPara,
    iconImg,
    conditionsPara,
    tempPara,
    feelslikePara,
    humidityPara,
    pressurePara,
    windPara,
    datetimePara,
  )
  return weatherContentDiv
}

function createTodaysWeatherContent(unit) {
  const { address } = weatherData
  const {
    hours,
    datetime,
    description,
    conditions,
    temp,
    feelslike,
    tempmax,
    tempmin,
    humidity,
    icon,
    pressure,
    sunrise,
    sunset,
    winddir,
    windspeed,
    windgust,
  } = weatherData.days[0]

  const weatherContentDiv = document.createElement("div")
  weatherContentDiv.classList.add = "todaysWeather"

  const addressHeader = document.createElement("h2")
  addressHeader.textContent = address

  const datetimePara = createParagraph(`Date: ${datetime}`)

  const descriptionPara = createParagraph(description)

  const iconImg = createIcon(icon)
  // document.createElement("img")
  // iconImg.alt = icon
  // import(`./assets/weatherIcons/${icon}.svg`).then((iconSvg) => {
  //   iconImg.src = iconSvg.default
  // })

  const conditionsPara = createParagraph(`Conditions: ${conditions}`)
  const tempPara = createParagraph(
    `Temperature: ${temp} º${unit.temperature}, Feels like: ${feelslike} º${unit.temperature}, Max: ${tempmax}/ Min: ${tempmin}`,
  )

  const humidityPara = createParagraph(`Humidity: ${humidity}%`)
  const pressurePara = createParagraph(`Airpressure: ${pressure} hPa`)

  const sunrisePara = createParagraph(`Sunrise: ${sunrise}`)
  const sunsetPara = createParagraph(`Sunset: ${sunset}`)

  const windPara = createParagraph(
    `Wind: ${winddir}º, ${windspeed} - ${windgust} ${unit.speed}`,
  )

  const hourlyDiv = document.createElement("div")
  const hourlyHeader = document.createElement("h3")
  hourlyHeader.textContent = "Hourly"
  hourlyDiv.appendChild(hourlyHeader)

  hours.forEach((hour, index) => {
    const { datetime, conditions, icon, temp, winddir, windspeed, windgust } =
      hour

    const timePara = createParagraph(datetime)
    const iconImg = createIcon(icon)
    const conditionsPara = createParagraph(conditions)
    const tempPara = createParagraph(
      `Temperature: ${temp} º${unit.temperature}, Feels like: ${feelslike} º${unit.temperature}`,
    )
    const windPara = createParagraph(
      `Wind: ${winddir}º, ${windspeed} - ${windgust} ${unit.speed}`,
    )

    hourlyDiv.append(timePara, iconImg, conditionsPara, tempPara, windPara)
  })

  weatherContentDiv.append(
    addressHeader,
    datetimePara,
    descriptionPara,
    iconImg,
    conditionsPara,

    tempPara,
    humidityPara,
    pressurePara,
    sunrisePara,
    sunsetPara,
    windPara,
    hourlyDiv,
  )
  return weatherContentDiv
}

function createThreeDaysWeatherContent(unit) {
  const weatherContentDiv = document.createElement("div")
  weatherContentDiv.classList.add = "currentWeather"

  return weatherContentDiv
}

function getCurrentConditions(conditionsObject) {
  return ({
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
  } = conditionsObject)
}

function createParagraph(content) {
  const para = document.createElement("p")
  para.textContent = content

  return para
}

function createIcon(condition) {
  const icon = document.createElement("img")
  icon.alt = condition
  import(`./assets/weatherIcons/${condition}.svg`).then((iconSvg) => {
    icon.src = iconSvg.default
  })

  return icon
}
