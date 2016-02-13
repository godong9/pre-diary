var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET User Page. */
router.get('/user/:id', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET User Emotion Page. */
router.get('/user/emotion/:id', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Post Page. */
router.get('/post/:id', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Write Post Page. */
router.get('/post/write', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
