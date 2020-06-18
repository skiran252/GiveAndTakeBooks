const mongoose = require('mongoose')
const validator = require('validator')
//const bcrypt = require('bcryptjs')
//const jwt = require('jsonwebtoken')

const bookSchema = new mongoose.Schema({
    bookname: {
        type: String,
        required: true,
        trim: true
    },
    qunatity:{
type:number,
required: true
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
        
    }
    ,
    address: {
        type: String,
        default: 0,
       
    }
})






const Book = mongoose.model('Book', bookSchema)

module.exports = Book