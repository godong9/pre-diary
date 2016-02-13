'use strict';

function Session() {

}

Session.prototype.hasSession = function (req) {
  return (typeof req.session !== "undefined" && typeof req.session._id !== "undefined");
};

Session.prototype.registerSession = function (req, user) {
  req.session._id = user._id;
  req.session.nickname = user.nickname;
};

Session.prototype.removeSession = function (req) {
  req.session.destroy();
};

module.exports = new Session();


