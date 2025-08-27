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
    fourteenDaysWeatherContent: createFourteenDaysWeatherContent(unit),
  }
}

function createCurrentWeatherContent(unit) {
  const weatherContentDiv = document.createElement("div")
  weatherContentDiv.classList.add("currentWeather")

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
    `Feels like: ${feelslike}º${unit.temperature}`,
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
  const tempPara = createParagraph(`Temperature: ${temp}º${unit.temperature}`)
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
  weatherContentDiv.classList.add("todaysWeather")

  const addressHeader = document.createElement("h2")
  addressHeader.textContent = address

  const datetimePara = createParagraph(`Date: ${datetime}`)

  const descriptionPara = createParagraph(description)

  const iconImg = createIcon(icon)

  const conditionsPara = createParagraph(`Conditions: ${conditions}`)
  const tempPara = createParagraph(
    `Temperature: ${temp}º${unit.temperature}, Feels like: ${feelslike}º${unit.temperature}`,
  )
  const minMaxTempPara = createParagraph(
    `Min: ${tempmin}º${unit.temperature} / Max: ${tempmax}º${unit.temperature}`,
  )

  const humidityPara = createParagraph(`Humidity: ${humidity}%`)
  const pressurePara = createParagraph(`Airpressure: ${pressure} hPa`)

  const sunrisePara = createParagraph(`Sunrise: ${sunrise}`)
  const sunsetPara = createParagraph(`Sunset: ${sunset}`)

  const windPara = createParagraph(
    `Wind: ${winddir}º, ${windspeed} - ${windgust} ${unit.speed}`,
  )
  const hourlyHeader = document.createElement("h3")

  const hourlyDiv = document.createElement("div")
  hourlyDiv.classList.add("hourlyDiv")
  hourlyHeader.textContent = "Hourly"

  hours.forEach((hour, index) => {
    // if (5 < index && index < 23) {
    const { datetime, conditions, icon, temp, winddir, windspeed, windgust } =
      hour

    const hourCard = document.createElement("div")
    hourCard.classList.add("hourCard")

    const timePara = createParagraph(datetime)
    const iconImg = createIcon(icon)
    const conditionsPara = createParagraph(conditions)
    const tempPara = createParagraph(
      `Temperature: ${temp}º${unit.temperature}, Feels like: ${feelslike}º${unit.temperature}`,
    )
    const windPara = createParagraph(
      `Wind: ${winddir}º, ${windspeed} - ${windgust} ${unit.speed}`,
    )

    hourCard.append(timePara, iconImg, conditionsPara, tempPara, windPara)
    hourlyDiv.appendChild(hourCard)
    // }
  })

  weatherContentDiv.append(
    addressHeader,
    datetimePara,
    descriptionPara,
    iconImg,
    conditionsPara,

    tempPara,
    minMaxTempPara,
    humidityPara,
    pressurePara,
    sunrisePara,
    sunsetPara,
    windPara,
    hourlyHeader,
    hourlyDiv,
  )
  return weatherContentDiv
}

function createFourteenDaysWeatherContent(unit) {
  const weatherContentDiv = document.createElement("div")
  weatherContentDiv.classList.add("fourteenDaysWeather")

  const addressHeader = document.createElement("h2")
  addressHeader.textContent = weatherData.address

  weatherContentDiv.appendChild(addressHeader)

  const days = weatherData.days

  const fourteenDaysDiv = document.createElement("div")
  fourteenDaysDiv.classList.add("fourteenDaysDiv")

  days.forEach((day, index) => {
    if (index == 0) return
    const {
      icon,
      tempmax,
      tempmin,
      sunset,
      sunrise,
      humidity,
      winddir,
      windspeed,
      windgust,
      pressure,
      description,
      datetime,
      conditions,
    } = day

    const dayCard = document.createElement("div")
    dayCard.classList.add("dayCard")

    const datetimePara = createParagraph(datetime)
    const descriptionPara = createParagraph(description)

    const iconImg = createIcon(icon)
    const minMaxTempPara = createParagraph(
      `Min: ${tempmin}º${unit.temperature} / Max: ${tempmax}º${unit.temperature}`,
    )

    const conditionsPara = createParagraph(`Conditions: ${conditions}`)
    const humidityPara = createParagraph(`Humidity: ${humidity}%`)
    const pressurePara = createParagraph(`Airpressure: ${pressure} hPa`)

    const sunrisePara = createParagraph(`Sunrise: ${sunrise}`)
    const sunsetPara = createParagraph(`Sunset: ${sunset}`)

    const windPara = createParagraph(
      `Wind: ${winddir}º, ${windspeed} - ${windgust} ${unit.speed}`,
    )

    dayCard.append(
      datetimePara,
      descriptionPara,
      iconImg,
      conditionsPara,
      minMaxTempPara,
      humidityPara,
      pressurePara,
      sunrisePara,
      sunsetPara,
      windPara,
    )

    fourteenDaysDiv.appendChild(dayCard)
  })

  weatherContentDiv.appendChild(fourteenDaysDiv)
  return weatherContentDiv
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
