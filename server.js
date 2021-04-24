// This file allows Heroku to start the application with the command "node server.js".
const express = require('express')
const app = express()

const port = process.env.PORT || 5000

app.listen(port)

console.log('Server started on port ' + port + '.')
