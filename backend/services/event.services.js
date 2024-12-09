const { Event } = require('../models/models')

const eventServices = (app) => {
  app.get('/api/events', (req, res) => {
    Event.find({}).then((events) => {
      res.json(events)
    })
  })

  app.get('/api/events/:id', (req, res, next) => {
    const id = req.params.id
    Event.findById(id)
      .then((event) => {
        if (event) {
          res.json(event)
        } else {
          res.status(404).end()
        }
      })
      .catch((err) => next(err))
  })

  app.delete('/api/events/:id', (req, res, next) => {
    const id = req.params.id
    Event.findByIdAndDelete(id)
      .then(() => {
        res.status(204).end()
      })
      .catch((err) => next(err))
  })

  app.put('/api/events/:id', (req, res, next) => {
    const id = req.params.id
    const body = req.body

    const event = {
      name: body.name,
      date: body.date,
      description: body.description,
      attendees: body.attendees ? body.attendees : [],
    }

    Event.findByIdAndUpdate(id, event, {
      new: true,
      runValidators: true,
      context: 'query',
    })
      .then((updatedUser) => {
        res.json(updatedUser)
      })
      .catch((err) => next(err))
  })

  app.post('/api/events', (req, res, next) => {
    // Obtain body from request
    const body = req.body

    // Create new event
    const newEvent = new Event({
      name: body.name,
      date: body.date,
      description: body.description,
      attendees: body.attendees ? body.attendees : [],
    })

    // Save new event to database
    newEvent
      .save()
      .then((savedEvent) => {
        res.json(savedEvent)
      })
      .catch((err) => next(err))
  })
}

module.exports = eventServices
