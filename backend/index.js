const express = require('express')
const cors = require('cors')
const User = require('./models/user')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/users', (req, res) => {
  User.find({}).then(users => {
    res.json(users)
  })
})

app.get('/api/users/:id', (request, response) => {
    const id = request.params.id
    const entry = User.findById(id).then(user => {
        response.json(user)
    })
    if (entry) {
        response.json(entry)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/users/:id', (request, response) => {
    const id = request.params.id
    User.findByIdAndRemove(id)
    response.status(204).end()
})

app.post('/api/users', (request, response) => {

    const body = request.body
    
    if (!body.name || !body.email || !body.password) {
        return response.status(400).json({
            error: 'email, password and name must be provided'
        })
    }

    if (entries.find(entry => entry.email === body.email)) {
        return response.status(400).json({
            error: 'email must be unique'
        })}

    const entry = User.create(body)

    entries = entries.concat(entry)
    response.json(entry)
})

const PORT = 3001
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)})
