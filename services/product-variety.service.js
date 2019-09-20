const ProductVariety = require('../_helpers/db').ProductVariety;

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function getAll(query, orgId) {
  const reqQuery = { ...{ organization: orgId }, ...query };
  return await ProductVariety.apiQuery(reqQuery).select('code name description active');
}

async function getById(id) {
  return await ProductVariety.findById(id);
}

async function create(category, orgId) {
  category.organization = orgId;
  return await ProductVariety.create(category);
}

async function update(id, category) {
  return await ProductVariety.findByIdAndUpdate({ _id: id }, category, {
    new: true,
    runValidators: true
  });
}

async function _delete(id) {
  return await ProductVariety.findByIdAndRemove({ _id: id });
}

// export default { list, get, create, update, delete: deleteUnit };
