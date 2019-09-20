const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const invoiceItemSchema = new Schema(
  {
    inventory: { type: ObjectId, ref: 'Inventory', required: true },
    // description: { type: String, trim: true },
    unit: { type: ObjectId, ref: 'Unit', required: true },
    qty: { type: Number },
    unitPrice: { type: Number },
    // price: { type: Number },
    discountPct: { type: Number },
    discountAmount: { type: Number },
    // extendedPrice: { type: Number },
    taxPct: { type: Number },
    taxAmount: { type: Number }
    // lineTotal: { type: Number },
  },
  { _id: false }
);

invoiceItemSchema.virtual('price').get(function() {
  return this.qty * this.unitPrice;
});

invoiceItemSchema.virtual('extendedPrice').get(function() {
  const discAmt = this.discountAmount > 0 ? this.discountAmount : this.price * (this.discountPct / 100);

  return this.price - discAmt;
});

invoiceItemSchema.virtual('lineTotal').get(function() {
  const taxAmt = this.taxAmount > 0 ? this.taxAmount : this.extendedPrice * (this.taxPct / 100);
  return this.extendedPrice + taxAmt;
});

/*
 * module.exports = { invoiceItemSchema };
 * export { invoiceItemSchema }
 */
module.exports = invoiceItemSchema;
