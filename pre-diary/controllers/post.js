'use strict';

var PostModel = require('../models/post');
var Session = require('../util/session');

function PostController() {

}

PostController.prototype.readPost = function(req, res) {
  var postPromise = PostModel.findOne({_id: req.params.id});
  postPromise.then(function(post) {
    //if (!Session.isAllow(req, post.author)) {
    //  return res.status(401).send('permission denied');
    //}
    res.status(200).send(post);
  }).catch(function(err) {
    return res.status(400).send(err);
  });
};

PostController.prototype.createPost = function(req, res) {
  var postPromise = PostModel.create(req.body);
  //if (!Session.isAllow(req, req.body.author)) {
  //  return res.status(401).send('permission denied');
  //}
  postPromise.then(function(post) {
    res.status(200).send(post);
  }).catch(function(err) {
    return res.status(400).send(err);
  });
};


module.exports = new PostController();