// This file allows Heroku to start the application with the command "node server.js".
const express = require('express')
const path = require('path')
const app = express()
const ptp = require('pdf-to-printer')

const port = process.env.PORT || 5000

app.use('/', express.static(path.join(__dirname, '/dist/pwa')))
app.get('/print', function (req, res) {
  const options = {
    printer: ['facturas']
  }
  ptp
    .print('./public/prueba.pdf', options)
    .then(print => {
      return res.json({
        print: print
      })
    })
    .catch((err) => {
      return res.json({
        print: err
      })
    })
})

app.listen(port)

console.log('Server started on port ' + port + '.')
