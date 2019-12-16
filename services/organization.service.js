const Organization = require("../_helpers/db").Organization;
const { ObjectId } = require("mongoose").Types;

module.exports = {
  getAll,
  getById,
  save,
  create,
  update,
  delete: _delete
};

async function getAll(query) {
  // const query = req.query || {};
  // console.log('service qry', query);
  return await Organization.apiQuery(query)
    .lean()
    .select("id code name description regdNum pan tan gstin active");
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

async function save(orgParam) {
  // console.log("org-Save", orgParam);
  // return await orgParam.save();
  if (ObjectId.isValid(orgParam._id)) {
    return update(orgParam._id, orgParam);
  } else {
    delete orgParam._id;
    return create(orgParam);
  }
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
