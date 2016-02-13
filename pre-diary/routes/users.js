'use strict';

var express = require('express');
var router = express.Router();
var UserCtrl = require('../controllers/user');

/**
 * @api {get} /users/login Naver Login
 * @apiName Login
 * @apiGroup User
 * @apiDescription 네이버 로그인하는 API (/users/login 으로 페이지 이동)
 */
router.get('/login', UserCtrl.login);

/**
 * Login Callback
 */
router.get('/login/callback', UserCtrl.loginCallback);

/**
 * @api {get} /users/:id Get User Info
 * @apiName GetUser
 * @apiGroup User
 * @apiDescription 유저 데이터 가져오는 API
 *
 * @apiExample {curl} Example usage:
 *     curl -i http://godong9.com:3001/users/56bf10b48ef8be4e4c3c858f
 *
 * @apiSuccess {Object} user user 데이터
 * @apiSuccess {String} user._id 유저 id
 * @apiSuccess {String} user.nickname 유저 닉네임
 * @apiSuccess {String} user.email 유저 이메일
 * @apiSuccess {String} user.birthday 유저 생일
 * @apiSuccess {String} user.emotionStatus 유저 감정상태 (1:bad ~ 5:good)
 * @apiSuccess {Object[]} user.posts 유저가 쓴 포스트 목록
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": "56bf10b48ef8be4e4c3c858f",
 *       ...
 *       "posts: [{ ... }]
 *     }
 */
router.get('/:id', UserCtrl.readUser);


module.exports = router;
