const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestampPlugin = require('mongoose-timestamp');
const invoiceItemSchema = require('./schemas/invoice-item.schema');
const invoiceMiscSchema = require('./schemas/invoice-misc.schema');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const invoiceSchema = new Schema({
  invoiceNumber: { type: String, trim: true, required: true },
  invoiceDate: { type: Date, required: true },
  invoiceType: {
    type: String,
    required: true,
    enum: ['Inventory', 'Purchase', 'DebitNote', 'Sales', 'CreditNote', 'Transfer', 'Exchange']
  },
  inventoryType: {
    type: String,
    enum: ['Opening', 'Adjustment', 'Wastage', 'Damage', 'Writeoff', 'Expired', 'Offer', 'Discount']
  },
  taxPreference: { type: String, enum: ['Taxable', 'TaxExempt'] },
  party: { type: ObjectId, ref: 'Party', required: true, index: true },
  partyRefNum: { type: String, trim: true },
  partyRefDate: { type: Date },
  paymentTerm: {
    type: String,
    enum: ['None', 'OnReceipt', 'Immediate', 'Net7', 'Net10', 'Net15', 'Net30', 'Net45', 'Net60', 'Net90', 'OnDate']
  },
  dueDate: { type: Date },
  lineItems: { type: [invoiceItemSchema] },
  subTotal: { type: Number },
  discountPct: { type: Number },
  discountAmount: { type: Number },
  taxPct: { type: Number },
  taxAmount: { type: Number },
  miscItems: { type: [invoiceMiscSchema] },
  netAmount: { type: Number },
  notes: { type: String, trim: true },
  invoiceStatus: {
    type: String,
    enum: ['Open', 'Paid', 'Overdue']
  },
  organization: { type: ObjectId, ref: 'Organization', required: true }
});

invoiceSchema.index({ organization: 1, invoiceNumber: 1 }, { unique: true });

// enables query capabilities (e.g. ?foo=bar)
invoiceSchema.plugin(mongooseStringQuery);
invoiceSchema.plugin(timestampPlugin);

/*
 * module.exports = {
 *   invoiceSchema,
 *   Invoice: mongoose.model('Invoice', invoiceSchema, 'invoices'),
 * }
 * const invoiceModel = mongoose.model('Invoice', invoiceSchema, 'invoices');
 * export { invoiceSchema, invoiceModel };
 */

module.exports = mongoose.model('Invoice', invoiceSchema, 'invoices');
