var express = require('express')
const router = new express.Router()
require('../middleware/passport')
const passport = require('passport')
const Book = require('../models/book')

const multer = require('multer')
const sharp = require('sharp')

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})


router.post('/users/addbook',upload.single('bookcover'),isLoggedIn, async (req,res)=>{
    console.log(req.file)
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    const encoded=buffer.toString('base64')
    const book = new Book(req.body)
    book.bookcover=new Buffer(encoded,'base64')
    book.userid = req.user.id
    book.address=req.user.address
    book.useremail=req.user.email
    book.save().then((data)=>{
        req.booksubmitmessage="Book Added successfully"
        res.redirect('/home') 
    }).catch((err)=>{
        req.booksubmitmessage="Book Title already exists"
        res.render('addbook')
    })
})

// router.get("/books/search",(req,res)=>{
//     res.render('searchresults')
// })
router.post("/books/search",(req,res)=> {

    Book.find( 
        { 
            $text : {$search : req.body.search} 
        } , 
        {
            score : { $meta: "textScore" } 
        }).sort( { score: { $meta: "textScore" } } ).then((result)=>
        {
            console.log()
            res.render('searchresults',{data:result})
        })
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}





module.exports = router