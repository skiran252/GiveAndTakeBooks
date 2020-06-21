var express = require('express')
const router = new express.Router();
require('../middleware/passport')
const passport = require('passport')
const Book = require('../models/book')
router.get('/login',(req,res)=>{
    res.render('login')
})

router.get('/home',isLoggedIn,(req,res)=>{
    res.render('home',{user:req.user})
})
router.post('/users/addbook',isLoggedIn,(req,res)=>{
    const book = new Book(req.body)
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
router.post('/users/login', passport.authenticate('local-login', {
    successRedirect : '/home', // redirect to the secure profile section
    failureRedirect : '/abcd', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));
router.get('/register',(req,res)=>{
    
    res.render('register.hbs')
})
router.get('/addbook',(req,res)=>{
    res.render('addbook.hbs')
})


router.post('/users/register', passport.authenticate('local-signup', {
    successRedirect : '/login',
    failureRedirect : '/register', 
    failureFlash : true
}));

router.get('/logout', function(req, res) {
    console.log('Logged out')
    req.logout();
    console.log(req.user)
    res.redirect('/') 
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
module.exports = router