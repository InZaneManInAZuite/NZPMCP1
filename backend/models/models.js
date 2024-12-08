// Obtain environment variables
require('dotenv').config()
const uri = process.env.MONGODB_URI


// Initialize MongoDB connection
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose.connect(uri)
    .catch(err => {
        console.log('Error connecting to MongoDB:', err.message)
    })



// Define important schemas
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
})

const eventSchema = new mongoose.Schema({
    name: String,
    date: Date,
    description: String,
    attendees: [String],
})



// Define toJSON method for userSchemas
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

eventSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})



// Define models
const User = mongoose.model('User', userSchema)
const Event = mongoose.model('Event', eventSchema)



module.exports = { User, Event }