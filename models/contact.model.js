const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestampPlugin = require('mongoose-timestamp');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const contactSchema = new Schema({
  contactOrganization: { type: ObjectId, ref: 'Organization', required: true },
  category: { type: ObjectId, ref: 'ContactCategory', required: true },
  contactType: {
    type: String,
    enum: ['Customers', 'Suppliers', 'Buyers', 'Vendors', 'Employees', 'Others']
  },
  paymentTerm: {
    type: String,
    enum: ['None', 'OnReceipt', 'Immediate', 'Net7', 'Net10', 'Net15', 'Net30', 'Net45', 'Net60', 'Net90', 'OnDate']
  },
  creditLimit: { type: Number },
  organization: { type: ObjectId, ref: 'Organization', required: true },
  active: { type: Boolean, default: true }
});

contactSchema.index({ organization: 1, contactOrganization: 1 }, { unique: true });
/*
 * partySchema.index({ organization: 1, partyCategory: 1 })
 * partySchema.index({ organization: 1, partyType: 1 })
 */

contactSchema.plugin(mongooseStringQuery);
contactSchema.plugin(timestampPlugin);

/*
 * module.exports = {
 *   partySchema,
 *   Party: mongoose.model('Party', partySchema, 'parties'),
 * }
 * const partyModel = mongoose.model('Party', partySchema, 'parties');
 * export { partySchema, partyModel };
 */

module.exports = mongoose.model('Contact', contactSchema, 'contacts');
