const Product = require('../_helpers/db').Product;

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function getAll(query, orgId) {
  const reqQuery = { ...{ organization: orgId }, ...query };

  return await Product.apiQuery(reqQuery).select(
    'code name description productCategory productType brand segment variety costPrice sellingPrice active'
    // unit taxCode taxPreference centralTaxPct stateTaxPct interStateTaxPct organization
  );
}

async function getById(id) {
  return await Product.findById(id);
}

async function create(productParam, orgId) {
  productParam.organization = orgId;
  return await Product.create(productParam);
}

async function update(id, productParam) {
  return await Product.findByIdAndUpdate({ _id: id }, productParam, {
    new: true,
    runValidators: true
  });
}

async function _delete(id) {
  return await Product.findByIdAndRemove({ _id: id });
}

// export default { list, get, create, update, delete: deleteUnit };
