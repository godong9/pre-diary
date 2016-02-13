function Session() {

}

Session.prototype.hasSession = function (req) {
  return (typeof req.session !== "undefined" && typeof req.session.id !== "undefined");
};

Session.prototype.getSession = function (req) {
  return {
    id: req.session.id,
    nickname: req.session.nickname
  };
};

Session.prototype.registerSession = function (req, user) {
  req.session.id = user.id;
  req.session.nickname = user.nickname;
};

Session.prototype.removeSession = function (req) {
  req.session.destroy();
};

module.exports = new Session();


