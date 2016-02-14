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
    if (!Session.isAllow(req, post.author)) {
      return res.status(401).send('permission denied');
    }
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
  if (!Session.hasSession(req)) {
    return res.status(401).send('permission denied');
  }
  query.author = req.session.userId;
  if (req.query.emotionStatus) {
    query.emotionStatus = req.query.emotionStatus;
  }
  postPromise = PostModel.find(query, {}, {sort:{openDate:-1}});
  postCountPromise = PostModel.aggregate([
    {$match: {author: query.author}},
    {$group:{_id:"$emotionStatus",total:{$sum:1}}},
    {$sort:{_id:1}}
  ]).exec();

  postPromise.then(function(posts) {
    result.posts = posts || [];
    return postCountPromise;
  }).then(function(postCount) {
    var emotionCount = {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0
    };
    var i, len;
    for (i=0, len=postCount.length; i<len; i++) {
      if (postCount[i] && postCount[i]._id) {
        emotionCount[postCount[i]._id] = postCount[i].total;
      }
    }
    result.count = emotionCount;

    var sum =
      (emotionCount["1"] * 1) +
      (emotionCount["2"] * 2) +
      (emotionCount["3"] * 3) +
      (emotionCount["4"] * 4) +
      (emotionCount["5"] * 5);
    var avg = Math.ceil(sum / 5.0);

    if (!avg) {
      avg = 1;
    }
    PostModel.model('User').update({_id: req.session.userId}, {$set: {emotionStatus:avg}}, function(err, result) {
      res.status(200).send(result);
    });
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
  if (!Session.isAllow(req, req.body.author)) {
    return res.status(401).send('permission denied');
  }
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