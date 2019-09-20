const Unit = require('../_helpers/db').Unit;

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function getAll(query, orgId) {
  const reqQuery = { ...{ organization: orgId }, ...query };

  return await Unit.apiQuery(reqQuery).select('code name active');
}

async function getById(id) {
  return await Unit.findById(id);
}

async function create(unitParam, orgId) {
  unitParam.organization = orgId;
  return await Unit.create(unitParam);
}

async function update(id, unitParam) {
  return await Unit.findByIdAndUpdate({ _id: id }, unitParam, {
    new: true,
    runValidators: true
  });
}

async function _delete(id) {
  return await Unit.findByIdAndRemove({ _id: id });
}

// export default { list, get, create, update, delete: deleteUnit }
