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
    bookcover:{
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
    address: {
        type: String,
        default: 0,
        ref: 'User'
    },
    useremail:{
        type: String
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