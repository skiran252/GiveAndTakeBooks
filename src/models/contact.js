const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const contactSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    subject: {
        type: String,
        
        required: true,
        trim: true
    },
    message: {
        type: String,
        
        required: true,
        trim: true
    }
})



const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact