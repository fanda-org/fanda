const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestampPlugin = require('mongoose-timestamp');
const addressSchema = require('./schemas/address.schema');
const contactSchema = require('./schemas/contact.schema');
const Schema = mongoose.Schema;

const organizationSchema = new Schema({
  code: {
    type: String,
    uppercase: true,
    trim: true,
    index: true,
    unique: true,
    required: true
  },
  name: {
    type: String,
    trim: true,
    index: true,
    unique: true,
    required: true
  },
  description: { type: String, trim: true },
  regdNum: { type: String, trim: true },
  pan: { type: String, trim: true },
  tan: { type: String, trim: true },
  gstin: { type: String, trim: true },
  billingAddress: { type: addressSchema },
  shippingAddress: { type: addressSchema },
  remittanceAddress: { type: addressSchema },
  contacts: { type: [contactSchema] },
  active: { type: Boolean, default: true }
});

organizationSchema.plugin(mongooseStringQuery);
organizationSchema.plugin(timestampPlugin);

/*
 * module.exports = exports = {
 *   organizationSchema,
 *   organizationModel: mongoose.model(
 *     'Organization',
 *     organizationSchema,
 *     'organizations'
 *   ),
 * }
 * const organizationModel = mongoose.model('Organization', organizationSchema, 'organizations');
 * export { organizationSchema, organizationModel };
 */

module.exports = mongoose.model('Organization', organizationSchema, 'organizations');
