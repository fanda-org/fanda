const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { addressSchema } = require('./address.schema');
const { contactSchema } = require('./contact.schema');

module.exports = new Schema(
  {
    code: { type: String, uppercase: true, trim: true, required: true },
    name: { type: String, trim: true, required: true },
    description: { type: String, trim: true },
    locationType: {
      type: String,
      enum: [
        'Default',
        'Head Office',
        'Regional Office',
        'Registered Office',
        'Branch',
        'Factory',
        'Production',
        'Warehouse',
        'Goodown',
        'Other'
      ]
    },
    address: addressSchema,
    contacts: [contactSchema]
    /*
     * organization: {
     *   type: ObjectId,
     *   ref: 'Organization',
     *   required: true,
     *   index: true,
     * },
     * active: { type: Boolean, default: true },
     */
  },
  { _id: false }
);

/*
 * locationSchema.index({ code: 1, organization: 1 }, { unique: true })
 * locationSchema.index({ name: 1, organization: 1 }, { unique: true })
 * locationSchema.plugin(mongooseStringQuery)
 * locationSchema.plugin(timestampPlugin)
 */

/*
 * module.exports = {
 *   locationSchema,
 *   Location: mongoose.model('Location', locationSchema, 'locations'),
 * }
 * const locationModel = mongoose.model('Location', locationSchema, 'locations')
 * export { locationSchema, locationModel }
 * export { locationSchema };
 */

//module.exports = { locationSchema };
