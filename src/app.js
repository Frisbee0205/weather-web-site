const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// SetUp handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// SetUp static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather App',
        name : 'Raymond Friston'
    })
} )

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name : 'Raymond Friston'    
    })
} )

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This Help Message is sent by dynamic call in node.js',
        title: 'Help Page',
        name : 'Raymond Friston'

    })
} )

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
      
   geocode(req.query.address, (error, {latitude, longitude, location} = {} ) => {
            if (error) {
                return res.send({ error : error })
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }
 
                    res.send({
                        forecast: forecastData,
                        location: location,
                        address: req.query.address
                    })
            })

        })

    })
            

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/Wetter', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {} ) => {
        if (error) {
            return res.send({ error : error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

                res.send({
                    forecast: forecastData,
                    location: location,
                    address: req.query.address
                })
        })

    })
})

app.get('/Materials', (req, res) =>  {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a searchterm'
        })
    }
    console.log(req.query.rating)
    res.send({
        materials: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 - Help',
        errorMessage: 'Help article not found',
        name: 'Raymond Friston'
    })
})

app.get('*', (req, res) => {
     res.render('404', {
         title: '404',
         error: 'Page not found',
         name: 'Raymond Friston'
     })
})

app.listen(3000, () => {
    console.log('Server is Up on port 3000')
})