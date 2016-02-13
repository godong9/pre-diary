var express = require('express');
var router = express.Router();
var mysql = require('../util/sql').mysql;
var pool = require('../util/sql').pool;

/**
 * @api {get} /users/:id Get User Info
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiSuccess {Object} user user 데이터
 * @apiSuccess {String} user.id 유저 id
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": "123456abcdef"
 *     }
 */
router.get('/:id', function(req, res, next) {
  pool.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) throw err;

    console.log('The solution is: ', rows[0].solution);
    res.send('respond with a resource');
  });
});

router.get('/login/callback', function(req, res, next) {
  res.send(req.query);
});

/**
 * @api {post} /users Add New User
 * @apiName PostUser
 * @apiGroup User
 *
 * @apiParam {String} type 가입 타입
 *
 * @apiSuccess {Object} user user 데이터
 * @apiSuccess {String} user.id 유저 id(쿠키에 저장할 값)
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": "123456abcdef"
 *     }
 */
router.post('/', function(req, res, next) {

});


module.exports = router;
