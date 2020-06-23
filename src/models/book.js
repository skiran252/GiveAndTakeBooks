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
        trim: true,
        text:true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        text:true
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

bookSchema.methods.toJSON = function () {
    const book = this
    const bookobject = book.toObject()
    delete bookobject.__v
    delete bookobject.score
    return bookobject
}
const Book = mongoose.model('Book', bookSchema)

module.exports = Book