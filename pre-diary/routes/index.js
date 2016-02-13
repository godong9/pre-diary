'use strict';

var express = require('express');
var router = express.Router();
var Session = require('../util/session');

var UserModel = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (Session.hasSession(req)) {
    return res.redirect('/user/'+req.session.userId);
  }
  res.render('login');
});

/* GET User Page. */
router.get('/user/:id', function(req, res, next) {
  //TODO: 주석 풀어야함!
  //if (!Session.hasSession(req)) {
  //  return res.status(404).send('permission denied');
  //}
  var viewData = {
    userId: req.session.userId
  };

  UserModel.findOne({_id: viewData.userId},'-accessToken -refreshToken', function(err, user) {
    viewData.user = user;
    res.render('user', viewData);
  });
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
