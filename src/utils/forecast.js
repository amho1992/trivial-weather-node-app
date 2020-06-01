const request = require('request')

const forecast = (lat, long, callback) => {
  const url = 'https://api.darksky.net/forecast/294745b51ca4f7211557582378d26625/' + lat + ',' + long + '?units=si'
  request({
    url: url,
    json: true
  }, (err, {
    body
  }) => {
    if (err) {
      callback('Unable to connect to server', undefined)
    } else if (body.error) {
      callback('Unable to find location', undefined)
    } else {
      callback(undefined, body.daily.data[0].summary + 'It is currently' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
    }
  })
}

module.exports = forecast