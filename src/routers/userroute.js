var express = require('express')
const router = new express.Router();
require('../middleware/passport')
const passport = require('passport')
const User = require('../models/user')


router.get('/',(req,res) =>{
    res.render('index',{user:req.user,active:req.active})
})


router.get('/login',(req,res)=>{
    res.render('login',{ message: req.flash('loginMessage') })
})

router.get('/home',isLoggedIn,(req,res)=>{
    res.render('home',{user:req.user})
})
const Contact =require('../models/contact')
router.post('/contact',(req,res)=>{
    const contact = new Contact(req.body)
    try{
    contact.save().then((result)=>{
            console.log(result)
            res.render('index')
        })}
        catch(err){
            console.log(err)
        }
   
})

router.post('/users/login', passport.authenticate('local-login', {
    successRedirect : '/home', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));
router.get('/register',(req,res)=>{
    res.render('register',{ message: req.flash('signupMessage') })
})


router.post('/users/register', passport.authenticate('local-signup', {
    successRedirect : '/login',
    failureRedirect : '/register', 
    failureFlash : true
}));


router.get('/updatebio',isLoggedIn,(req,res)=>{
    res.render('updatebio',{user:req.user})
})
router.post('/savechanges',isLoggedIn,(req,res)=>{
    
    console.log(req.body)
    console.log('hello2')
    try{
    User.findByIdAndUpdate(req.user.id,req.body).then((result)=>{
        res.redirect('/home')
    })}
    catch(err){
        console.log(err.message)
    }
})

router.get('/logout', isLoggedIn,function(req, res) {
    req.logout();
    res.redirect('/') 
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.send("<h1> Please Authenticate </h1> <button href='/login'>LOGIN</button");
}
module.exports = router