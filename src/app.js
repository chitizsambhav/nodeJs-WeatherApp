const express = require('express');
const path = require('path')
const hbs = require('hbs')
const geoCoding = require('./utils/geo-coding')
const weatherUpdate = require('./utils/weather-response')

const app = express()
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialsDirectoryPath = path.join(__dirname, '../templates/partials')
app.use(express.static(path.join(__dirname, '..','public')))

app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)

app.get('', (req,res)=>{
    res.render('index',{
        title: "Weather App"
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title:"About",
        name: "Chitiz",
        position: "Creator of the App"
    })
})

app.get('/help', (req,res)=>{
    res.render('help', {
        title:"Help",
        email:'abc@gmail.com',
    })
})

app.get('/weather', (req,res)=>{
    if (!req.query.address){
        return res.send({
            error:"Address Must be provided"
        })
    }
    else{
        geoCoding(req.query.address, (error,{latitude, longitude, location} = {})=>{
            if (error){
                return res.send({
                    error: error
                })
            }
            else{
                weatherUpdate(latitude,longitude,(error,{current_temp,feels_like,weather_desc})=>{
                    if (error){
                        return res.send({
                            error:error
                        })
                    }
                    res.send({
                        forecast:weather_desc,
                        curr_temp: current_temp,
                        feels_like: feels_like,
                        location:location
                    })
                })
            }
        })
    }
})

app.get('/help/*', (req, res)=>{
    const endpointURL = req.originalUrl
    res.render('404Template',{
        endpoint: endpointURL
    })
})
app.get('*', (req,res)=>{
    const endpointURL = req.originalUrl
    console.log(endpointURL)
    res.render('404Template',{
        endpoint: endpointURL
    })
})

app.listen(80,()=>{
    console.log("The Server is running on port:80")
})