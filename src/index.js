//import database connection
require('./db/mangoose.js')
//creating instance of all npm modules
const express   = require('express')
const path      = require('path');
const hbs       = require('hbs');
const passport  = require('passport');
const cookieParser = require('cookie-parser')
var flash       = require('connect-flash');
const bodyParser = require('body-parser')
const session = require('express-session')

//userrouter
const userRouter = require('./routers/userroute.js')

//setting up port
const port = process.env.PORT || 3000

//initialize the app
const app = express()
require('./middleware/passport')(passport);
app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(cookieParser())

//passport setup
app.use(session({ secret: 'thisisnotthesecretyouarelookingforyouareconfused' }))
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash())

//using user router
app.use(userRouter)




//converts response to json or else its made invalid

//public path
const publicDir = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

app.use(express.static(publicDir))
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)

hbs.registerHelper('greaterThan', function (v1, v2, options) {
    'use strict';
       if (v1>v2) {
         return options.fn(this);
      }
      return options.inverse(this);
    });
app.get('/',(req,res) =>{
    res.render('login')
})





app.get('*',(req,res)=>{
    res.status(404).send("Page not found")
})


app.listen(port, () => {
    console.log('server is up and running on',port)
})