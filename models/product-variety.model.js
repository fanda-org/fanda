const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestampPlugin = require('mongoose-timestamp');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const productVarietySchema = new Schema({
  code: { type: String, uppercase: true, trim: true, required: true },
  name: { type: String, trim: true, required: true },
  description: { type: String, trim: true },
  organization: { type: ObjectId, ref: 'Organization', required: true },
  active: { type: Boolean, default: true }
});
productVarietySchema.index({ organization: 1, code: 1 }, { unique: true });
productVarietySchema.index({ organization: 1, name: 1 }, { unique: true });
productVarietySchema.index({ organization: 1, parentCategory: 1 });

// enables query capabilities (e.g. ?foo=bar)
productVarietySchema.plugin(mongooseStringQuery);
productVarietySchema.plugin(timestampPlugin);

module.exports = mongoose.model('ProductVariety', productVarietySchema, 'product_varieties');
