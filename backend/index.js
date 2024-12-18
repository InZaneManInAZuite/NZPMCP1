// Start the server
const express = require('express')
const app = express()
app.use(express.json())
require('dotenv').config()

// Enable CORS
const cors = require('cors')
app.use(cors())

// Enable logging
app.use(express.static('dist'))

// Enable services
require('./services/user.services')(app)
require('./services/event.services')(app)
require('./services/attendee.services')(app)

// Error handling middleware and unknown endpoint middleware
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })
