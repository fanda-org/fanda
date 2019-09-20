const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestampPlugin = require('mongoose-timestamp');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const unitConversionSchema = new Schema({
  fromUnit: { type: ObjectId, ref: 'Unit', required: true },
  toUnit: { type: ObjectId, ref: 'Unit', required: true },
  calcStep: { type: Number, required: true, default: 1 },
  operator: { type: String, required: true, enum: ['+', '-', '*', '/', '^'] },
  factor: { type: Number, required: true },
  organization: { type: ObjectId, ref: 'Organization', required: true },
  active: { type: Boolean, default: true }
});
unitConversionSchema.index({ organization: 1, fromUnit: 1, toUnit: 1 }, { unique: true });

// enables query capabilities (e.g. ?foo=bar)
unitConversionSchema.plugin(mongooseStringQuery);
unitConversionSchema.plugin(timestampPlugin);

/*
 * module.exports = {
 *   unitConversionSchema,
 *   UnitConversion: mongoose.model(
 *     'UnitConversion',
 *     unitConversionSchema,
 *     'unit_conversions'
 *   ),
 * }
 * const unitConversionModel = mongoose.model('UnitConversion', unitConversionSchema, 'unit_conversions');
 * export { unitConversionSchema, unitConversionModel };
 */

module.exports = mongoose.model('UnitConversion', unitConversionSchema, 'unit_conversions');
