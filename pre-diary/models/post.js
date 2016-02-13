'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Post Schema
 */
var PostSchema = new Schema({
  subject: { type: String, required: true }, // 제목
  content: { type: String, required: true }, // 내용
  author: { type: String, required: true }, // 작성자 id
  isSecret: { type: Boolean, default: true }, // 비밀 상태 여부
  openDate: { type: Date, required: true }, // 공개되는 시간
  emotionStatus: { type: Number, default: 0 }, // 감정상태 (1~5). 0은 설정 안된 상태
  createDate: { type: Date, default: Date.now }, // 생성 시간
  updateDate: { type: Date, default: Date.now } // 수정 시간
}, { collection: 'posts' });

PostSchema.index({ openDate: -1 });
PostSchema.index({ updateDate: -1 });

/**
 * Model Methods
 */


module.exports = mongoose.model('Post', PostSchema);