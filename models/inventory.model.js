const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const inventorySchema = new Schema({
  product: { type: ObjectId, ref: 'Product', required: true, index: true },
  description: { type: String, trim: true },
  batchNumber: { type: String, trim: true, index: true },
  mfgDate: { type: Date },
  expiryDate: { type: Date },
  unit: { type: ObjectId, ref: 'Unit', required: true, index: true },
  qtyOnHand: { type: Number },
  costPrice: { type: Number },
  profitPct: { type: Number },
  sellingPrice: { type: Number }
});
inventorySchema.index({ product: 1, batchNumber: 1 }, { unique: true });

// enables query capabilities (e.g. ?foo=bar)
inventorySchema.plugin(mongooseStringQuery);

module.exports = mongoose.model('Inventory', inventorySchema, 'inventories');
