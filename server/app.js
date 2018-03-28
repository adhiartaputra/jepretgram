const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer')
const cors = require('cors')
// const FB = require('fb');
const pass = process.env.PASSWORD
const dbURL = `mongodb://just-to-do-it:${pass}@just-to-do-it-shard-00-00-grhoo.mongodb.net:27017,just-to-do-it-shard-00-01-grhoo.mongodb.net:27017,just-to-do-it-shard-00-02-grhoo.mongodb.net:27017/todolist?ssl=true&replicaSet=just-to-do-it-shard-0&authSource=admin`
const dblocal = 'mongodb://localhost:27017/jepretgram';
const db = mongoose.connection;
require('dotenv').config()

const index = require('./routes/index');
const users = require('./routes/users');
const file = require('./routes/file');
const login = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/login', login);
app.use('/file', file);

mongoose.connect(dblocal, err => {
  if (!err)
    console.log('Connected to database');
  else
    console.log('Error Connect to database');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
