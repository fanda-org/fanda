const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestampPlugin = require('mongoose-timestamp');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const productSchema = new Schema({
  code: { type: String, uppercase: true, trim: true, required: true },
  name: { type: String, trim: true, required: true },
  description: { type: String, trim: true },
  category: { type: ObjectId, ref: 'ProductCategory', required: true },
  productType: { type: String, enum: ['Goods', 'Service'], required: true },
  brand: { type: ObjectId, ref: 'ProductBrand', required: true },
  segment: { type: ObjectId, ref: 'ProductSegment', required: true },
  variety: { type: ObjectId, ref: 'ProductVariety', required: true },
  unit: { type: ObjectId, ref: 'Unit', required: true },
  // code HSN for Goods; SAC for Service
  taxCode: { type: String, trim: true },
  taxPreference: { type: String, enum: ['Taxable', 'Nontaxable'], required: true },
  centralTaxPct: { type: Number },
  stateTaxPct: { type: Number },
  interStateTaxPct: { type: Number },
  costPrice: { type: Number },
  sellingPrice: { type: Number },
  organization: { type: ObjectId, ref: 'Organization', required: true },
  active: { type: Boolean, default: true }
});

productSchema.index({ organization: 1, code: 1 }, { unique: true });
productSchema.index({ organization: 1, name: 1 }, { unique: true });
productSchema.index({ organization: 1, productCategory: 1 });
// productSchema.index({ taxCode: 1, organization: 1 }, { unique: true });

// enables query capabilities (e.g. ?foo=bar)
productSchema.plugin(mongooseStringQuery);
productSchema.plugin(timestampPlugin);

/*
 * module.exports = {
 *   productSchema,
 *   Product: mongoose.model('Product', productSchema, 'products'),
 * }
 * const productModel = mongoose.model('Product', productSchema, 'products');
 * export { productSchema, productModel };
 */

module.exports = mongoose.model('Product', productSchema, 'products');
