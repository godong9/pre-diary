'use strict';

var express = require('express');
var router = express.Router();
var PostCtrl = require('../controllers/post');

/**
 * @api {get} /posts/:id Get Post
 * @apiName GetPost
 * @apiGroup Post
 * @apiDescription 포스트 데이터 가져오는 API
 *
 * @apiExample {curl} Example usage:
 *     curl -i http://godong9.com:3001/posts/56bf1c7f8f2f3ab94ec59e51
 *
 * @apiSuccess {Object} post post 데이터
 * @apiSuccess {String} post._id post id
 * @apiSuccess {String} post.author 작성자 id
 * @apiSuccess {String} post.subject 제목
 * @apiSuccess {String} post.content 내용
 * @apiSuccess {Boolean} post.isSecret 현재 비밀 여부(true: 비밀상태, false: 공개 상태)
 * @apiSuccess {Date} post.openDate 공개되는 시간
 * @apiSuccess {Number} post.emotionStatus 감정상태 (1:bad ~ 5:good). 0은 설정안한 상태
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": "56bf1c7f8f2f3ab94ec59e51",
 *       ...
 *     }
 */
router.get('/:id', PostCtrl.readPost);

/**
 * @api {get} /posts Get Post List
 * @apiName GetPostList
 * @apiGroup Post
 * @apiDescription 포스트 데이터 리스트 가져오는 API
 *
 * @apiExample {curl} Example usage:
 *     curl -i http://godong9.com:3001/posts?emotionStatus=4
 *
 * @apiParam {Number} [emotionStatus] 가져올 감정 상태 (1~5)
 *
 * @apiSuccess {Object[]} posts post 데이터 리스트
 * @apiSuccess {Object} count post 카운트
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
   *     posts:[
   *       {
   *         "id": "56bf1c7f8f2f3ab94ec59e51",
   *         ...
   *       }
   *     ],
   *     count:{
   *       "1": "10",
   *       "2": "5",
   *       "3": "3",
   *       "4": "7",
   *       "5": "2"
   *     }
 *     }
 */
router.get('/', PostCtrl.readPosts);

/**
 * @api {post} /posts Add New Post
 * @apiName PostPost
 * @apiGroup Post
 * @apiDescription 포스트 데이터 추가하는 API
 *
 * @apiExample {curl} Example usage:
 *     http://godong9.com:3001/posts
 *
 * @apiParam {Object} post post 데이터
 * @apiParam {String} post.title 제목
 * @apiParam {String} post.content 내용
 * @apiParam {Date} post.openDate 공개되는 시간 (표준시 형태로 넘겨야함. ex)"2016-05-17T11:16:53.378Z")
 *
 * @apiSuccess {Object} post post 데이터
 * @apiSuccess {String} post._id post id
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "123456abcdef"
 *       ...
 *     }
 */
router.post('/', PostCtrl.createPost);


/**
 * @api {put} /posts/:id Update Post
 * @apiName PutPost
 * @apiGroup Post
 * @apiDescription 포스트 데이터 업데이트하는 API (감정상태 업데이트)
 *
 * @apiExample {curl} Example usage:
 *     http://godong9.com:3001/posts/56bf1c7f8f2f3ab94ec59e51
 *
 * @apiParam {Object} post post 데이터
 * @apiParam {Number} post.emotionStatus 감정상태(1:bad ~ 5:good)
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 */
router.put('/:id', PostCtrl.updatePost);


module.exports = router;
