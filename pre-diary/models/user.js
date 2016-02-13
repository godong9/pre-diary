'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * User Schema
 */
var UserSchema = new Schema({
  _id: { type: String },
  nickname: { type: String, required: true }, // 닉네임
  email: { type: String, required: true }, // 이메일
  birthday: { type: String, required: true }, // 생일
  accessToken: { type: String, required: true }, // 네이버 액세스 토큰
  refreshToken: { type: String, required: true }, // 네이버 리프레시 토큰
  emotionStatus: { type: Number, default: 3 }, // 이모션 상태(1:bad ~ 5:good)
  createDate: { type: Date, default: Date.now() }, // 생성 시간
  updateDate: { type: Date, default: Date.now() } // 수정 시간
}, { collection: 'users' });

UserSchema.index({ nickname: 1 }, { unique: true });

/**
 * Model Methods
 */

module.exports = mongoose.model('User', UserSchema);