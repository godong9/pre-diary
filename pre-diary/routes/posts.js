'use strict';

var express = require('express');
var router = express.Router();
var PostCtrl = require('../controllers/post');

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
router.get('/:id', PostCtrl.readPost);

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
router.post('/', PostCtrl.createPost);


module.exports = router;
