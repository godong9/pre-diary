'use strict';

function Session() {

}

Session.prototype.hasSession = function (req) {
  return (typeof req.session !== "undefined" && typeof req.session.userId !== "undefined");
};

Session.prototype.registerSession = function (req, user) {
  req.session.userId = user._id;
  req.session.userNickname = user.nickname;
};

Session.prototype.removeSession = function (req) {
  req.session.destroy();
};

Session.prototype.isAllow = function (req, userId) {
  return (this.hasSession(req) && req.session.userId === userId);
};

module.exports = new Session();
