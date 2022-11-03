const searchbox = document.getElementById('country')
const searchBtn = document.getElementById('submit-weather')
const mainCard = document.getElementById('main-card')
const secondaryCards = document.querySelectorAll('.temperature-card')

let dataObject
let weatherArray = []

async function getWeatherData(){
    let location = searchbox.value
    let forecast = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${location}&id=524901&appid=b7e3474cceef0623afc10707abc1053a`)
    dataObject = await forecast.json()
    getWeatherArray()
    loadWeatherIntoDOM()
}

function getCityName(){
    return dataObject.city.name
}

function getWeatherArray(){
    let readings = dataObject.list
    weatherArray = readings.slice(0, 11)
    console.log(weatherArray)
}

function getTemperature(){
    let newTempsArray = []
    weatherArray.forEach(reading => newTempsArray.push(Math.ceil(reading.main.temp - 273.15)))
    return newTempsArray
}

function getWeather(){
    weatherArray.forEach(reading => console.log(`${reading.weather[0].main} -----> ${reading.weather[0].description}`))
}

function loadWeatherIntoDOM(){
    const weather = mainCard.querySelector('div').querySelector('#weather')
    const temp = mainCard.querySelector('div').querySelector('#temperature-now')
    const time = mainCard.querySelector('div').querySelector('p')
    const image = mainCard.querySelector('img')

    let temperatureArray = getTemperature()
    temp.innerHTML = `The temperature is ${temperatureArray[0]}°C`
    weather.innerHTML = weatherArray[0].weather[0].main
    time.innerHTML = weatherArray[0].dt_txt
    switch(weatherArray[0].weather[0].main){
        case 'Clouds':
            image.src = 'cloudy.svg'
            break
        case 'Rain':
            image.src = 'rain.svg'
            break
        case 'Clear':
            image.src = 'sunny.svg'
            break
    }

    for(let i = 1; i < weatherArray.length; i++){
        secondaryCards[i-1].querySelector('h2').innerHTML = weatherArray[i].dt_txt.slice(11, 16)
        secondaryCards[i-1].querySelector('p').innerHTML = `${temperatureArray[i]}°C`
        switch(weatherArray[i].weather[0].main){
            case 'Clouds':
                secondaryCards[i-1].querySelector('img').src = 'cloudy.svg'
                break
            case 'Rain':
                secondaryCards[i-1].querySelector('img').src = 'rain.svg'
                break
            case 'Clear':
                secondaryCards[i-1].querySelector('img').src = 'sunny.svg'
                break
        }
    }
}

searchBtn.addEventListener('click', getWeatherData)
getWeatherData('Melitopol')