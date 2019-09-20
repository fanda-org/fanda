const ProductSegment = require('../_helpers/db').ProductSegment;

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function getAll(query, orgId) {
  const reqQuery = { ...{ organization: orgId }, ...query };
  return await ProductSegment.apiQuery(reqQuery).select('code name description active');
}

async function getById(id) {
  return await ProductSegment.findById(id);
}

async function create(category, orgId) {
  category.organization = orgId;
  return await ProductSegment.create(category);
}

async function update(id, category) {
  return await ProductSegment.findByIdAndUpdate({ _id: id }, category, {
    new: true,
    runValidators: true
  });
}

async function _delete(id) {
  return await ProductSegment.findByIdAndRemove({ _id: id });
}

// export default { list, get, create, update, delete: deleteUnit };
