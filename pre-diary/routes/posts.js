var express = require('express');
var router = express.Router();

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
router.get('/', function (req, res, next) {

});

/**
 * @api {get} /posts/:id Get Post
 * @apiName GetPost
 * @apiGroup Post
 *
 * @apiSuccess {Object} post post 데이터
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
router.get('/:id', function (req, res, next) {

});

/**
 * @api {post} /posts Add New Post
 * @apiName PostPost
 * @apiGroup Post
 *
 * @apiSuccess {Object} post post 데이터
 * @apiSuccess {String} post.id post id
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": "123456abcdef"
 *     }
 */
router.post('/', function (req, res, next) {

});


module.exports = router;
