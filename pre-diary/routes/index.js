'use strict';

var express = require('express');
var router = express.Router();
var Session = require('../util/session');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (Session.hasSession(req)) {
    return res.redirect('/user/'+req.session.userId);
  }
  res.render('login');
});

/* GET User Page. */
router.get('/user/:id', function(req, res, next) {
  res.render('user');
});

/* GET User Emotion Page. */
router.get('/user/emotion/:id', function(req, res, next) {
  res.render('userEmotion');
});

/* GET Post Page. */
router.get('/post/:id', function(req, res, next) {
  res.render('post');
});

/* GET Write Post Page. */
router.get('/post/write', function(req, res, next) {
  res.render('writePost');
});


module.exports = router;
