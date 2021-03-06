'use strict';

var log4js = require('log4js');
var logger = log4js.getLogger('controllers/user');

var UserModel = require('../models/user');
var Session = require('../util/session');

var CLIENT_ID = 'ramRPsEprwFt2FOzrHzg';
var CLIENT_SECRET = '5KYRbJV1Tw';

function UserController() {

}

UserController.prototype.readUser = function(req, res) {
  var userPromise = UserModel.findOne({_id: req.params.id},'-accessToken -refreshToken');
  var postPromise = UserModel.model('Post').find({author: req.params.id});
  var result = null;
  if (!Session.isAllow(req, req.params.id)) {
    return res.status(401).send('permission denied');
  }
  userPromise.then(function(user) {
    if (!user) {
      throw 'not exist user';
    }
    result = user;
    return postPromise;
  }).then(function(posts) {
    result.posts = posts || [];
    res.status(200).send(result);
  }).catch(function(err) {
    logger.error(err);
    return res.status(400).send(err);
  });
};

UserController.prototype.login = function(req, res) {
  res.redirect('https://nid.naver.com/oauth2.0/authorize?response_type=code&' +
    '&client_id=' + CLIENT_ID +
    '&redirect_uri=http%3A%2F%2Fgodong9.com%3A3001%2Fusers%2Flogin%2Fcallback' +
    '&state=' + CLIENT_SECRET
  )
};

UserController.prototype.logout = function(req, res) {
  Session.removeSession(req);
  res.redirect('/');
};

UserController.prototype.loginCallback = function(req, res) {
  if (Session.hasSession(req)) {
    return res.redirect('/user/'+req.session.userId);
  }
  var request = require('request');
  request('https://nid.naver.com/oauth2.0/token?grant_type=authorization_code' +
    '&client_id=' + CLIENT_ID +
    '&client_secret=' + CLIENT_SECRET +
    '&code=' + req.query.code + '&state=' + req.query.state,
    function (error, response, body) {
      var tokenResult, result, options, newUser;
      if (!error && response.statusCode == 200) {
        try {
          tokenResult = JSON.parse(body);
        } catch (e) {
          logger.error(e);
          return res.status(400).send(e);
        }

        options = {
          url: 'https://openapi.naver.com/v1/nid/me',
          headers: {
            'Authorization': 'Bearer ' + tokenResult.access_token
          }
        };

        request(options, function (error, response, body) {
          try {
            result = JSON.parse(body);
          } catch (e) {
            logger.error(e);
            return res.status(400).send(e);
          }

          newUser = {
            nickname: result.response.nickname,
            email: result.response.email,
            birthday: result.response.birthday,
            accessToken: tokenResult.access_token,
            refreshToken: tokenResult.refresh_token
          };

          logger.debug("newUser:", newUser);
          UserModel.findOne({nickname: newUser.nickname}, function(err, user) {
            if (user) {
              Session.registerSession(req, user);
              return res.redirect('/user/'+req.session.userId);
            }
            UserModel.create(newUser, function(err, user) {
              if (err) {
                logger.error(err);
                return res.status(400).send(err);
              }
              Session.registerSession(req, user);
              res.redirect('/user/'+req.session.userId);
            });
          });
        });
      }
    });
};


module.exports = new UserController();