const config = require('config.json');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || config.connectionString, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false
});
mongoose.Promise = global.Promise;

module.exports = {
  Bank: require('../models/bank.model'),
  ContactCategory: require('../models/contact-category.model'),
  Contact: require('../models/contact.model'),
  Inventory: require('../models/inventory.model'),
  Invoice: require('../models/invoice.model'),
  Organization: require('../models/organization.model'),
  ProductBrand: require('../models/product-brand.model'),
  ProductCategory: require('../models/product-category.model'),
  ProductSegment: require('../models/product-segment.model'),
  ProductVariety: require('../models/product-variety.model'),
  Product: require('../models/product.model'),
  UnitConversion: require('../models/unit-conversion.model'),
  Unit: require('../models/unit.model'),
  User: require('../models/user.model')
};
