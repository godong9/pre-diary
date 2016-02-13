var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * User Schema
 */
var UserSchema = new Schema({
  nickname: { type: String, required: true }, // 닉네임
  createDate: { type: Date, default: Date.now() }, // 생성 시간
  updateDate: { type: Date, default: Date.now() } // 수정 시간
}, { collection: 'users' });

UserSchema.index({ name: 1 }, { unique: true });

/**
 * Model Methods
 */

module.exports = mongoose.model('User', UserSchema);