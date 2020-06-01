const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
const port = process.env.PORT || 3000

const publicDirectory = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)


app.use(express.static(publicDirectory))

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'amirhossein'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'amirhossein'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpful text.',
    title: 'Help',
    name: 'amirhossein'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    res.send({
      error: 'you must provide an address'
    })
  }

  geocode(req.query.address, (err, {
    latitude,
    longitude,
    location
  }={}) => {
    if (err) {
      return res.send({
        err
      })
    }
    forecast(latitude, longitude, (err, forecastData) => {
      if (err) {
        return res.send({
          err
        })
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })
})
app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'amirhossein',
    errorMessage: 'Help article not found.'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'amirhossein',
    errorMessage: 'Page not found.'
  })
})

app.listen(port, () => {
  console.log('Server is up on port.'+port)
})