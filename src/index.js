//import database connection
require("./db/mangoose.js");
//creating instance of all npm modules
const express = require("express");
const path = require("path");
const ejs = require("ejs");
const passport = require("passport");
const cookieParser = require("cookie-parser");
var flash = require("connect-flash");
const bodyParser = require("body-parser");
const session = require("express-session");

//userrouter
const userRouter = require("./routers/userroute.js");
const bookRouter = require("./routers/bookrouter.js");

//setting up port
const port = process.env.PORT || 3000;

//initialize the app
const app = express();
require("./middleware/passport")(passport);
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

//passport setup
app.use(
  session({ secret: "thisisnotthesecretyouarelookingforyouareconfused" })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//using user router
app.use(userRouter);
app.use(bookRouter);

//converts response to json or else its made invalid

//public path
const publicDir = path.join(__dirname, "../public");
const viewspath = path.join(__dirname, "../templates/views");
const partialspath = path.join(__dirname, "../templates/partials");

app.use(express.static(publicDir));
app.set("view engine", "ejs");
app.set("views", viewspath);

app.use(function (req, res, next) {
  req.active = req.path.split("/")[1]; // [0] will be empty since routes start with '/'
  next();
});

app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(port, () => {
  console.log("server is up and running on", port);
});
