const ContactCategory = require('../_helpers/db').ContactCategory;

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function getAll(query, orgId) {
  const reqQuery = { ...{ organization: orgId }, ...query };
  return await ContactCategory.apiQuery(reqQuery).select('code name description parentCategory active');
}

async function getById(id) {
  return await ContactCategory.findById(id);
}

async function create(category, orgId) {
  category.organization = orgId;
  return await ContactCategory.create(category);
}

async function update(id, category) {
  return await ContactCategory.findByIdAndUpdate({ _id: id }, category, {
    new: true,
    runValidators: true
  });
}

async function _delete(id) {
  return await ContactCategory.findByIdAndRemove({ _id: id });
}

// export default { list, get, create, update, delete: deleteUnit };
