var express = require('express');
var router = express.Router();
var mysql = require('../util/sql').mysql;
var pool = require('../util/sql').pool;

/* GET users listing. */
router.get('/', function(req, res, next) {

  pool.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) throw err;

    console.log('The solution is: ', rows[0].solution);
    res.send('respond with a resource');
  });
});

router.get('/:id', function(req, res, next) {

});


module.exports = router;
