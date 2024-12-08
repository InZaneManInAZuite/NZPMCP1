const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', false)

const uri = process.env.MONGODB_URI

mongoose.connect(uri)
    .then(res => {
        console.log('Connected to MongoDB')
    })
    .catch(err => {
        console.log('Error connecting to MongoDB:', err.message)
    })

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('User', userSchema)