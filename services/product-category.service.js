const ProductCategory = require('../_helpers/db').ProductCategory;

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function getAll(query, orgId) {
  const reqQuery = { ...{ organization: orgId }, ...query };

  return await ProductCategory.apiQuery(reqQuery).select('code name description parentCategory active');
}

async function getById(id) {
  return await ProductCategory.findById(id);
}

async function create(category, orgId) {
  category.organization = orgId;
  return await ProductCategory.create(category);
}

async function update(id, category) {
  return await ProductCategory.findByIdAndUpdate({ _id: id }, category, {
    new: true,
    runValidators: true
  });
}

async function _delete(id) {
  return await ProductCategory.findByIdAndRemove({ _id: id });
}

// export default { list, get, create, update, delete: deleteUnit };
