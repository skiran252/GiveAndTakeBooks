var express = require('express')
const router = new express.Router();
require('../middleware/passport')
const passport = require('passport')



router.get('/login',(req,res)=>{
    res.render('login',{ message: req.flash('loginMessage') })
})

router.get('/home',isLoggedIn,(req,res)=>{
    res.render('home',{user:req.user})
})

router.post('/users/login', passport.authenticate('local-login', {
    successRedirect : '/home', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));
router.get('/register',(req,res)=>{
    res.render('register',{ message: req.flash('signupMessage') })
})
router.get('/addbook',(req,res)=>{
    res.render('addbook')
})


router.post('/users/register', passport.authenticate('local-signup', {
    successRedirect : '/login',
    failureRedirect : '/register', 
    failureFlash : true
}));
router.get('/me/books',isLoggedIn,(req,res)=>{
    try{
    Book.find({userid:req.user.id}).sort({'createdAt':-1}).then((result)=>{
        res.send(result)
    })}
    catch(err){
        console.log(err.message)
    }
})


router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/') 
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
module.exports = router