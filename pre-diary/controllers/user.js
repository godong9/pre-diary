'use strict';

var Q = require('q');
var UserModel = require('../models/user');
var Session = require('../util/session');
var CLIENT_ID = 'ramRPsEprwFt2FOzrHzg';
var CLIENT_SECRET = '5KYRbJV1Tw';

function UserController() {

}

UserController.prototype.readUser = function(req, res) {
  UserModel.findOne({_id: req.params.id}, function(err, user) {
    if (err) {
      return res.status(400).send(err);
    }
    res.status(200).send(user);
  });
};

UserController.prototype.createUser = function(req, res) {

};

UserController.prototype.login = function(req, res) {
  if (Session.hasSession(req)) {
    return res.redirect('/user/'+req.session._id);
  }
  var request = require('request');
  request('https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&' +
    'client_id=' + CLIENT_ID +
    '&client_secret=' + CLIENT_SECRET +
    '&code=' + req.query.code + '&state=' + req.query.state,
    function (error, response, body) {
      var tokenResult, result, options, newUser;
      if (!error && response.statusCode == 200) {
        try {
          tokenResult = JSON.parse(body);
        } catch (e) {
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
            return res.status(400).send(e);
          }

          newUser = {
            nickname: result.response.nickname,
            email: result.response.email,
            birthday: result.response.birthday,
            accessToken: tokenResult.access_token,
            refreshToken: tokenResult.refresh_token
          };

          UserModel.create(newUser, function(err, user) {
            if (err) {
              res.status(400).send(err);
              return;
            }
            Session.registerSession(req, user);
            res.status(200).send(user);
          });
        });
      }
    });
};


module.exports = new UserController();