const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema(
  {
    operator: { type: String, enum: ['Add', 'Deduct'] },
    description: { type: String, trim: true },
    amount: { type: Number }
  },
  { _id: false }
);

/*
 *module.exports = { invoiceMiscSchema };
 * export { invoiceMiscSchema }
 */
