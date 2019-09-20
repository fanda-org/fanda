const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestampPlugin = require('mongoose-timestamp');
const addressSchema = require('./schemas/address.schema');
const contactSchema = require('./schemas/contact.schema');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const bankSchema = new Schema({
  accountNumber: { type: String, trim: true, required: true },
  shortName: { type: String, uppercase: true, trim: true },
  bankName: { type: String, trim: true },
  accountType: {
    type: String,
    enum: ['Default', 'Savings', 'Current', 'Fixed', 'Demat', 'Salary']
  },
  ifscCode: { type: String, trim: true },
  micrCode: { type: String, trim: true },
  branchCode: { type: String, trim: true },
  branchName: { type: String, trim: true },
  address: { type: addressSchema },
  contact: { type: contactSchema },
  organization: { type: ObjectId, ref: 'Organization', required: true },
  active: { type: Boolean, default: true }
});

bankSchema.index({ organization: 1, accountNumber: 1 }, { unique: true });

bankSchema.plugin(mongooseStringQuery);
bankSchema.plugin(timestampPlugin);

/*
 * module.exports = {
 *   bankSchema,
 *   Bank: mongoose.model('Bank', bankSchema, 'banks'),
 * }
 * const bankModel = mongoose.model('Bank', bankSchema, 'banks');
 *export { bankSchema, bankModel };
 */

module.exports = mongoose.model('Bank', bankSchema, 'banks');
