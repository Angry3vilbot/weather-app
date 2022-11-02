let dataObject

async function getWeatherData(location){
    let forecast = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${location}&id=524901&appid=b7e3474cceef0623afc10707abc1053a`)
    dataObject = await forecast.json()
}

function getCityName(){
    console.log(dataObject.city.name)
}

function getTemperatureArray(){
    let readings = dataObject.list
    let temperatureArray = []
    temperatureArray = readings.slice(0, 11)
    console.log(temperatureArray)
}