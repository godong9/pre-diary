'use strict';

var log4js = require('log4js');
var logger = log4js.getLogger('controllers/post');

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
    logger.error(err);
    return res.status(400).send(err);
  });
};

PostController.prototype.readPosts = function(req, res) {
  var query = {};
  var result = {};
  var postPromise, postCountPromise;
  //TODO: 주석 풀어야함!
  //if (!Session.hasSession(req)) {
  //  return res.status(401).send('permission denied');
  //}
  //query.author = req.session.userId;
  if (req.query.emotionStatus) {
    query.emotionStatus = req.query.emotionStatus;
  }
  postPromise = PostModel.find(query, {}, {sort:{openDate:-1}});
  postCountPromise = PostModel.aggregate([
    {$match: query},
    {$group:{_id:"$emotionStatus",total:{$sum:1}}},
    {$sort:{_id:1}}
  ]);
  postPromise.then(function(posts) {
    result.posts = posts || [];
    return postCountPromise;
  }).then(function(postCount) {
    result.count = postCount;
    res.status(200).send(result);
  }).catch(function(err) {
    logger.error(err);
    return res.status(400).send(err);
  });
};

PostController.prototype.createPost = function(req, res) {
  var postPromise;
  if (!Session.hasSession(req)) {
    return res.status(401).send('permission denied');
  }
  req.body.author = req.session.userId;
  postPromise = PostModel.create(req.body);
  //if (!Session.isAllow(req, req.body.author)) {
  //  return res.status(401).send('permission denied');
  //}
  postPromise.then(function(post) {
    res.status(200).send(post);
  }).catch(function(err) {
    logger.error(err);
    return res.status(400).send(err);
  });
};

PostController.prototype.updatePost = function(req, res) {
  var postPromise;
  if (!Session.hasSession(req)) {
    return res.status(401).send('permission denied');
  }
  postPromise = PostModel.update({_id: req.params.id},{$set:{emotionStatus: req.body.emotionStatus}});
  //TODO: 유저 권한 체크 필요!
  postPromise.then(function() {
    res.status(200).send('success');
  }).catch(function(err) {
    logger.error(err);
    return res.status(400).send(err);
  });
};


module.exports = new PostController();