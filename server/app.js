/** 
  app.js
  Student Name: Chinnawut Boonluea
  Student ID: 301276464
  Date: 2023-02-07
**/
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');

const mongoose = require('mongoose');
const User = require('./models/user');
const indexRouter = require('./routes/index');
const DB = require('./db');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')));

// session setup
app.use(session({
  secret: "Chinnawut",
  resave: false,
  saveUninitialized: false
}));

//Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Configure passport-local to use user model for authentication
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// setup flash
app.use(flash());

//Point mongoose to the DB URI
mongoose.connect(DB.URI, {useNewUrlParser:true, useUnifiedTopology:true})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(`Error: ${err}`));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
