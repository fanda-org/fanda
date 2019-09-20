const ProductBrand = require('../_helpers/db').ProductBrand;

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function getAll(query, orgId) {
  const reqQuery = { ...{ organization: orgId }, ...query };
  return await ProductBrand.apiQuery(reqQuery).select('code name description active');
}

async function getById(id) {
  return await ProductBrand.findById(id);
}

async function create(category, orgId) {
  category.organization = orgId;
  return await ProductBrand.create(category);
}

async function update(id, category) {
  return await ProductBrand.findByIdAndUpdate({ _id: id }, category, {
    new: true,
    runValidators: true
  });
}

async function _delete(id) {
  return await ProductBrand.findByIdAndRemove({ _id: id });
}

// export default { list, get, create, update, delete: deleteUnit };
