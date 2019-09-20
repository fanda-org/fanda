const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

module.exports = new Schema(
  {
    salutation: {
      type: String,
      enum: ['', 'Mr.', 'Mrs.', 'Ms.', 'Miss.', 'Dr.']
    },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      validate: value => validator.isEmail(value)
    },
    workPhone: { type: String, trim: true },
    mobile: { type: String, trim: true },
    designation: { type: String, trim: true },
    department: { type: String, trim: true }
  },
  { _id: false }
);

/*
 *module.exports = { contactSchema };
 * export { contactSchema };
 */
