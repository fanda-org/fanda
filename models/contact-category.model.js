const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestampPlugin = require('mongoose-timestamp');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const contactCategorySchema = new Schema({
  code: { type: String, uppercase: true, trim: true, required: true },
  name: { type: String, trim: true, required: true },
  description: { type: String, trim: true },
  parentCategory: { type: ObjectId, ref: 'ContactCategory' },
  organization: { type: ObjectId, ref: 'Organization', required: true },
  active: { type: Boolean, default: true }
});
contactCategorySchema.index({ organization: 1, code: 1 }, { unique: true });
contactCategorySchema.index({ organization: 1, name: 1 }, { unique: true });
contactCategorySchema.index({ organization: 1, parentCategory: 1 });

// enables query capabilities (e.g. ?foo=bar)
contactCategorySchema.plugin(mongooseStringQuery);
contactCategorySchema.plugin(timestampPlugin);

/*
 * module.exports = {
 *   productCategorySchema,
 *   ProductCategory: mongoose.model(
 *     'ProductCategory',
 *     productCategorySchema,
 *     'product_categories'
 *   ),
 * }
 * const productCategoryModel = mongoose.model('ProductCategory', productCategorySchema, 'product_categories');
 * export { productCategorySchema, productCategoryModel };
 */

module.exports = mongoose.model('ContactCategory', contactCategorySchema, 'contact_categories');
