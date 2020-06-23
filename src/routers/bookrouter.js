var express = require('express')
const router = new express.Router()
require('../middleware/passport')
const passport = require('passport')
const Book = require('../models/book')

const {sendRequestMail} = require('../mailer/requestmail');
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


router.post('/users/addbook',isLoggedIn,upload.single('bookcover'), async (req,res)=>{
    const buffer = await sharp(req.file.buffer).resize({ width: 200, height:null}).png().toBuffer()
    const book = new Book(req.body)
    book.bookcover= buffer
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

router.get('/books/:id/bookcover', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        
        if (!book || !book.bookcover) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(book.bookcover)
    } catch (e) {
        res.status(404).send()
    }
})
// router.get("/books/search",(req,res)=>{
//     res.render('searchresults')
// })
router.post("/books/search",(req,res)=> {

    Book.find( 
        { 
            $text : {$search : req.body.search} 
        }, 
        {
            score : { $meta: "textScore" } 
        }).sort( { score: { $meta: "textScore" } } ).then((result)=>
        {
            res.render('searchresults',{data:result,user:req.user})
        })
})

router.get('/mybooks',isLoggedIn,(req,res)=>{
    try{
    Book.find({userid:req.user.id}).sort({'createdAt':-1}).then((result)=>{
        console.log(result)
        res.render('mybooks',{data:result,user:req.user})
    })}
    catch(err){
        console.log(err)
    }
})

// router.get('/me/books',isLoggedIn,(req,res)=>{
//     try{
//     Book.find({userid:req.user.id}).sort({'createdAt':-1}).then((result)=>{
//         res.send(result)
//     })}
//     catch(err){
//         console.log(err.message)
//     }
// })
router.get('/addbook',isLoggedIn,(req,res)=>{
    res.render('addbook',{user:req.user})
})

router.get('/delete/:id',isLoggedIn,(req,res)=>{
    var id=req.params.id;
    try{
    Book.findByIdAndDelete(id).then((result)=>{
        res.redirect("/mybooks")
    })}
    catch(err){
        console.log(err.message)
    }
})
router.get('/bookedit/:id',isLoggedIn,(req,res)=>{
    
    var id=req.params.id;
    console.log(id)
    try{
    Book.findById(id).then((result)=>{
        console.log(result)
        res.render('bookedit',{book:result})
    })}
    catch(err){
        console.log(err.message)
    }
})


router.post('/books/request/:id',isLoggedIn,(req,res)=>{
    const user = req.user;
    const id = req.params.id;
    console.log(req.body)
    Book.findOne({_id:id}).then((book)=>
    {
        sendRequestMail(book.useremail,user.email,user.firstname,book.bookname,req.body.reason)
        res.redirect('/home')
    }).catch((err)=>{
        console.log(err.message)
    })
})
router.post('/bookupdate',isLoggedIn,(req,res)=>{
    
    console.log(req.body)
    try{
    Book.findByIdAndUpdate(req.body.id,{
        bookname:req.body.bookname,
        quantity:req.body.quantity,

        description:req.body.description
    }).then((result)=>{
        res.redirect('/mybooks')
    })}
    catch(err){
        console.log(err.message)
    }
})



function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.send("<h1> Please Authenticate </h1> <a href='/login'>LOGIN</a");
}




module.exports = router