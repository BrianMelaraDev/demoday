// server.js

// set up ======================================================================
// get all the tools we need

var express  = require('express');
//download express module and require the module and setting it to a variable 
var app      = express();
//seeting the varibale app to equal the express method
var port     = process.env.PORT || 5000;
// any port the user wants or 8080, port cant be a static number to be hosted else where as they might used a different port to host the server on
const MongoClient = require('mongodb') /** */
//requiring the MongoDB mondule and setting it equal the variable of MongoClient, .MongoClient 
var mongoose = require('mongoose');
// requiring mongoose module and set to mongoose variable, object data librabry for Mongo, allows you to make the user schema
var passport = require('passport');
//passport is a module that handles all user login authentication, and setting it equal to the passport variable, we are export this varible so it can be required in other files.
var flash    = require('connect-flash');
//flash handles all errors example like no user found , user login errors, we are requiring and setting it equal to variable flash
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var configDB = require('./config/database.js');
const path = require('path')
const ObjectId = require('mongodb').ObjectID
const multer = require('multer')

const storage = multer.diskStorage({
  destination:'./public/uploads/',
   filename: function(req, file, cb ){
     console.log(file.fieldname);
     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname) )
   }
  })
const upload = multer({
  storage: storage,
  limits:{fileSize: 10000000}
}).single('myFile')

var db
//creating the variable db
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
// configuration ===============================================================
mongoose.connect(configDB.url, (err, database) => {
  //return any errors
  if (err) return console.log(err)
  db = database
  console.log('Connected to DB');
  // console.log(db);
  //sets db as our database and require it to another file so it can fetch modules and our db for our routes to use , create CRUD functions
  require('./app/routes.js')(app, passport, db, ObjectId, multer,  storage , upload);
}); // connect to our database
//connect tour Mongo database to mongoose
require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(express.json()); // get information from html forms
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
//allowing all files in the public folder to be served up whenever called
app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
    secret: 'rcbootcamp2019a', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
