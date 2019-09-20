const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

module.exports = new Schema(
  {
    organization: { type: ObjectId, ref: 'Organization' },
    role: {
      type: String,
      trim: true,
      enum: ['Guest', 'User', 'PowerUser', 'Manager', 'Admin', 'SuperAdmin']
    }
  },
  { _id: false }
);

/*
 * userRoleSchema.index({ user: 1, role: 1 }, { unique: true })
 *module.exports = { userRoleSchema };
 * export { userRoleSchema }
 */
