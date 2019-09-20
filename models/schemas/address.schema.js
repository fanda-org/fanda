const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema(
  {
    attn: { type: String, trim: true },
    line1: { type: String, trim: true },
    line2: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    postalCode: { type: String, trim: true },
    country: { type: String, trim: true },
    /*
     * addressType: {
     *   type: String,
     *   enum: ['Default', 'Home', 'Work', 'Billing', 'Shipping', 'Remittance'],
     * },
     */
    phone: { type: String, trim: true },
    fax: { type: String, trim: true }
  },
  { _id: false }
);

/*
 * module.exports = { addressSchema };
 * export { addressSchema };
 */
