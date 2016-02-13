var express = require('express');
var router = express.Router();
var mysql = require('../util/sql').mysql;
var pool = require('../util/sql').pool;

/* GET User Post List */

/**
 * @api {get} /posts Get Post List
 * @apiName GetPostList
 * @apiGroup Post
 *
 * @apiParam {String} userId 유저 ID
 *
 * @apiSuccess {Object[]} post post 리스트 데이터
 * @apiSuccess {String} post.id post id
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "id": "123456abcdef"
 *       }
 *     ]
 */
router.get('/', function(req, res, next) {

});

router.get('/:id', function(req, res, next) {

});

router.post('/', function(req, res, next) {

});


module.exports = router;
