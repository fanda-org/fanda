const Contact = require('../_helpers/db').Contact;

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function getAll(query, orgId) {
  const reqQuery = { ...{ organization: orgId }, ...query };

  return await Contact.apiQuery(reqQuery)
    .populate({ path: 'partyOrganization', select: 'code name' })
    .select('_id category partyType active');
  // paymentTerm creditLimit organization
}

async function getById(id) {
  return await Contact.findById(id).populate({
    path: 'partyOrganization',
    model: 'Organization',
    select: '-userRoles -active -updatedAt -createdAt -__v'
    // select: 'id code name description regdNum pan tan gstin locations',
  });
}

async function create(partyParam, orgId) {
  partyParam.organization = orgId;
  return await Contact.create(partyParam);
}

async function update(id, partyParam) {
  return await Contact.findByIdAndUpdate({ _id: id }, partyParam, {
    new: true,
    runValidators: true
  });
}

async function _delete(id) {
  return await Contact.findByIdAndRemove({ _id: id });
}

// export default { list, get, create, update, delete: deleteParty };
