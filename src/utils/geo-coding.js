const request = require('request');
const geoCoding = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(address)+ '.json?access_token=pk.eyJ1IjoiY3NhbWJoYXYiLCJhIjoiY2x1NGJ5dmMyMWRkejJpbnhtamhxbGZjbCJ9.Vaa3PuoRbJehK8SYHL1bPg&limit=1'
    request({url, json:true}, (error,{body})=>{
        if(error){
            callback('The geocoding service is not reachable', undefined)
        }
        else if (body.features.length === 0){
            callback('Please enter a valid Location', undefined)
        }
        else if (body.error){
            callback("Location is not availble",undefined)
        }
        else{
            data = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback(undefined,data)
        }
    })
}

module.exports = geoCoding