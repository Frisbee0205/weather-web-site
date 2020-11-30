const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=257c484f113e9a6b0695969774a50ff6&query=' + encodeURIComponent(latitude) + ',' +  encodeURIComponent(longitude) + '&units=m'

 //   request({url: url, json: true}, (error, response) => { 
//    shorthand destructuring = url
//    request({url, json: true}, (error, response) => {
// Destructure response with body
    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
//        } else if (response.body.error) {            
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                // latitude: response.body.location.lat,
                // longitude: response.body.location.lon,
                // temperature: response.body.current.temperature,
                // description: response.body.current.weather_descriptions[0],
                // name: response.body.location.name,
                // localTime: response.body.location.localtime

                latitude: body.location.lat,
                longitude: body.location.lon,
                temperature: body.current.temperature,
                description: body.current.weather_descriptions[0],
                name: body.location.name,
                localTime: body.location.localtime
            })
        }
    })
}

module.exports = forecast