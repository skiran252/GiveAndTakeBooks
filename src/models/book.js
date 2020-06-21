const mongoose = require('mongoose')
const validator = require('validator')
//const bcrypt = require('bcryptjs')
//const jwt = require('jsonwebtoken')

const bookSchema = new mongoose.Schema(
    {
    bookname: 
    {
        type: String,
        required: true,
        trim: true
    },
    quantity:
    {
        type:Number,
        required: true
    },
    photo:{
        type:Buffer
    },
    available:{
        type:Boolean,
        default:true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        
    },
    address: {
        type: String,
        default: 0,
        ref: 'User'
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
    },{
    timestamps:true
})






const Book = mongoose.model('Book', bookSchema)

module.exports = Book