const mongoose = require('mongoose');
const validator = require('validator');
const mongooseStringQuery = require('mongoose-string-query');
const timestampPlugin = require('mongoose-timestamp');
const userRoleSchema = require('./schemas/user-role.schema');
// const mongooseBcrypt = require('mongoose-bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    lowercase: true,
    trim: true,
    index: true,
    unique: true,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    index: true,
    unique: true,
    required: true,
    validate: value => validator.isEmail(value)
  },
  salutation: {
    type: String,
    enum: ['', 'Mr.', 'Mrs.', 'Ms.', 'Miss.', 'Dr.']
  },
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  workPhone: { type: String, trim: true },
  mobile: { type: String, trim: true },
  // roles: { type: [roleSchema], required: true },
  hash: { type: String, required: true },
  loginAt: { type: Date },
  userRoles: { type: [userRoleSchema] },
  active: { type: Boolean, default: true }
});

// userSchema.index({ email: 1, userName: 1 })

// enables query capabilities (e.g. ?foo=bar)
userSchema.plugin(mongooseStringQuery);
userSchema.plugin(timestampPlugin);
// userSchema.plugin(mongooseBcrypt);

/*
 * module.exports = exports = {
 *   roleSchema: roleSchema,
 *   userModel: mongoose.model('User', userSchema, 'users'),
 * }
 * const userModel = mongoose.model('User', userSchema, 'users');
 *export { userSchema, userModel };
 */

module.exports = mongoose.model('User', userSchema, 'users');
