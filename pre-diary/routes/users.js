var express = require('express');
var router = express.Router();
var UserCtrl = require('../controllers/user');

/**
 * Login API
 */
router.get('/login/callback', UserCtrl.login);


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
router.get('/:id', UserCtrl.readUser);

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
router.post('/', UserCtrl.createUser);


module.exports = router;
