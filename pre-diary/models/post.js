'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Post Schema
 */
var PostSchema = new Schema({
  subject: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  isSecret: { type: Boolean, default: true },
  openDate: { type: Date, required: true },
  createDate: { type: Date, default: Date.now() }, // 생성 시간
  updateDate: { type: Date, default: Date.now() } // 수정 시간
}, { collection: 'posts' });

/**
 * Model Methods
 */

module.exports = mongoose.model('Post', PostSchema);