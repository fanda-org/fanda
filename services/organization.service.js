const Organization = require('../_helpers/db').Organization;

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function getAll(query) {
  // const query = req.query || {};
  // console.log('service qry', query);
  return await Organization.apiQuery(query)
    .lean()
    .select('id code name description regdNum pan tan gstin active');
}

async function getById(id) {
  /*
   * .populate({
   *   path: 'userRoles.user',
   *   model: 'User',
   *   select: 'id',
   * })
   */

  return await Organization.findById(id).lean();
}

async function create(orgParam) {
  return await Organization.create(orgParam);
}

async function update(id, orgParam) {
  return await Organization.findByIdAndUpdate({ _id: id }, orgParam, {
    new: true,
    runValidators: true
  });
}

async function _delete(id) {
  return await Organization.findByIdAndRemove({ _id: id });
}

// export default { list, get, create, update, delete: deleteOrg }
