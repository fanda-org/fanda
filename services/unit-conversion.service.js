const UnitConversion = require('../_helpers/db').UnitConversion;

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function getAll(query, orgId) {
  const reqQuery = { ...{ organization: orgId }, ...query };

  return await UnitConversion.apiQuery(reqQuery).select('fromUnit toUnit active');
  // calcStep operator factor organization
}

async function getById(id) {
  return await UnitConversion.findById(id);
}

async function create(unitConvParam, orgId) {
  unitConvParam.organization = orgId;
  return await UnitConversion.create(unitConvParam);
}

async function update(id, unitConvParam) {
  return await UnitConversion.findByIdAndUpdate({ _id: id }, unitConvParam, {
    new: true,
    runValidators: true
  });
}

async function _delete(id) {
  return await UnitConversion.findByIdAndRemove({ _id: id });
}

// export default { list, get, create, update, delete: deleteUnitConversion }
