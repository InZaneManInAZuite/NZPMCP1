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

// user cannot have same email as another user
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (email) => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
      },
      message: props => `${props.value} is not valid`
    },
  },
  password: {
    type: String,
    required: true,
  },
  events: {
    type: [String],
    default: [],
  },
})

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  attendees: {
    type: [String],
    default: [],
  },
})



// Define toJSON method for userSchemas
const transformer = (document, returnedObject) => {
  returnedObject.id = returnedObject._id.toString()
  delete returnedObject._id
  delete returnedObject.__v
}

userSchema.set('toJSON', { transform: transformer })
eventSchema.set('toJSON', { transform: transformer })



// Define models
const User = mongoose.model('User', userSchema)
const Event = mongoose.model('Event', eventSchema)



module.exports = { User, Event }