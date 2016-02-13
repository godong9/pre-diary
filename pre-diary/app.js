var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var fs = require('fs');

var routes = require('./routes/index');
var users = require('./routes/users');
var posts = require('./routes/posts');

var app = express();

var DB_URI = 'mongodb://localhost/prediary';
var MongoStore = null;
var modelsPath = null;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/doc', express.static(path.join(__dirname, 'doc')));

// Model files
modelsPath = path.join(__dirname, './models');

fs.readdirSync(modelsPath).forEach(function (file) {
  if (/(.*)\.(js$|coffee$)/.test(file)) {
    require(modelsPath + '/' + file);
  }
});

// Database Setup
mongoose.connect(DB_URI, {});

// Route files
app.use('/', routes);
app.use('/users', users);
app.use('/posts', posts);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// Session
if (app.get('env') === 'production') {
  MongoStore = require('connect-mongo')(session);
  app.use(session({
    secret: 'prediary',
    store: new MongoStore({ url: DB_URI }),
    resave: false,
    saveUninitialized: true
  }));
} else {
  app.use(session({
    secret: 'prediary',
    resave: false,
    saveUninitialized: true
  }));
}

module.exports = app;
