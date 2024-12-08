const { User } = require('../models/models')

const userServices = (app) => {
    app.get('/api/users', (req, res) => {
        User.find({}).then(users => {
          res.json(users)
        })
      })
      
      app.get('/api/users/:id', (req, res, next) => {
          const id = req.params.id
          User.findById(id)
              .then(user => {
                  if (user) {
                      res.json(user)
                  } else {
                      express.response.status(404).end()
                  }
              })
              .catch(err => next(err))
              
      })
      
      app.delete('/api/users/:id', (req, res, next) => {
          const id = req.params.id
          User.findByIdAndDelete(id)
              .then(() => {
                  res.status(204).end()
              })
              .catch(err => next(err))
      })
      
      app.put('/api/users/:id', (req, res, next) => {
          const id = req.params.id
          const body = req.body
      
          const user = {
              name: body.name,
              email: body.email,
              password: body.password,
          }
      
          User.findByIdAndUpdate(id, user, { new: true})
              .then(updatedUser => {
                  res.json(updatedUser)
              })
              .catch(err => next(err))
      })
      
      
      app.post('/api/users', (req, res, next) => {
      
          // Obtain body from request
          const body = req.body
      
          // Check if body is missing any required fields
          if (!body.name || !body.email || !body.password) {
              return res.status(400).json({
                  error: 'email, password, and name must be provided'
              })
          }
      
          // Check if email is already in use
          User.findOne({email : body.email})
              .then(user => {
                  if (user) {
                      return res.status(400).json({
                          error: 'email already in use'
                      })
                  } else {
      
                      // Create new user
                      const newUser = new User({
                          name: body.name,
                          email: body.email,
                          password: body.password,
                      })
      
                      // Save new user to database
                      newUser.save()
                          .then(savedUser => {
                              res.json(savedUser)
                          })
                          .catch(err => next(err))
                  }
              })
              .catch(err => next(err))
      })
}

module.exports = userServices;