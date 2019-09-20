const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestampPlugin = require('mongoose-timestamp');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const unitSchema = new Schema({
  code: { type: String, uppercase: true, trim: true, required: true },
  name: { type: String, trim: true, required: true },
  organization: { type: ObjectId, ref: 'Organization', required: true },
  active: { type: Boolean, default: true }
});
unitSchema.index({ organization: 1, code: 1 }, { unique: true });
unitSchema.index({ organization: 1, name: 1 }, { unique: true });

// enables query capabilities (e.g. ?foo=bar)
unitSchema.plugin(mongooseStringQuery);
unitSchema.plugin(timestampPlugin);

/*
 * module.exports = {
 *   unitSchema,
 *   Unit: mongoose.model('Unit', unitSchema, 'units'),
 * }
 * const unitModel = mongoose.model('Unit', unitSchema, 'units');
 * export { unitSchema, unitModel };
 */

module.exports = mongoose.model('Unit', unitSchema, 'units');
