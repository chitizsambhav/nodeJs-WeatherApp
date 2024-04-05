const request = require('request');
const geoCoding = require('./geo-coding')

const weatherUpdate = (latitude,longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=7740f98f09539ff3b09856f1c9f04876&units=f&query='+encodeURIComponent(latitude.toString())+','+encodeURIComponent(longitude.toString())+'&units=m'
    request({url, json:true}, (error,{body})=>{
        if (error){
            callback('The service is unreachable',undefined)
        }

        else if (body.error){
            callback('The coordinates are not correct', undefined)
        }
        else{
            data={
                current_temp : body.current.temperature,
                feels_like : body.current.feelslike,
                weather_desc: body.current.weather_descriptions[0]
            }
            callback(undefined,data)
        }
    })
}

module.exports = weatherUpdate