var Q = require('q');
var UserModel = require('../models/user');

var CLIENT_ID = 'ramRPsEprwFt2FOzrHzg';
var CLIENT_SECRET = '5KYRbJV1Tw';

function UserController() {

}

UserController.prototype.readUser = function(req, res) {
  UserModel.find({}, function(err, docs) {
    if (err) return res.status(400).send(err);
    res.status(200).send(docs);
  });
};

UserController.prototype.createUser = function(req, res) {

};

UserController.prototype.login = function(req, res) {
  var request = require('request');
  request('https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&' +
    'client_id=' + CLIENT_ID +
    '&client_secret=' + CLIENT_SECRET +
    '&code=' + req.query.code + '&state=' + req.query.state,
    function (error, response, body) {
      var result, options;
      if (!error && response.statusCode == 200) {
        try {
          result = JSON.parse(body);
        } catch (e) {
          return res.send(e);
        }
        options = {
          url: 'https://openapi.naver.com/v1/nid/me',
          headers: {
            'Authorization': 'Bearer ' + result.access_token
          }
        };
        request(options, function (error, response, body) {
          try {
            result = JSON.parse(body);
          } catch (e) {
            return res.send(e);
          }

          //TODO: 유저 회원 가입 추가
          res.send(result.response);
        });
      }
    });
};


module.exports = new UserController();