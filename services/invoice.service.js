const Invoice = require('../_helpers/db').Invoice;

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function getAll(query, orgId) {
  const reqQuery = { ...{ organization: orgId }, ...query };

  return await Invoice.apiQuery(reqQuery)
    .lean()
    /*
     * .populate({
     *   path: 'party',
     *   model: 'Party',
     *   select: 'id partyOrganization',
     * })
     */
    .select('invoiceNumber invoiceDate invoiceType inventoryType subTotal taxAmount netAmount invoiceStatus')
    .populate({
      path: 'party',
      model: 'Party',
      select: '-_id -category -active -partyType -paymentTerm -creditLimit -organization -updatedAt -createdAt -__v'
    });
}

async function getById(id) {
  return await Invoice.findById(id).lean();
  /*
   * .populate('lineItems.price')
   * .populate({
   *   path: 'lineItems',
   *   select: 'inventory unit qty unitPrice price',
   * })
   */
}

async function create(invoiceParam, orgId) {
  /*
   * const invoice = req.body;
   * invoice.organization = req.params.orgId;
   */
  invoiceParam.organization = orgId;
  return await Invoice.create(invoiceParam);
}

async function update(id, invoiceParam) {
  return await Invoice.findByIdAndUpdate({ _id: id }, invoiceParam, {
    new: true,
    runValidators: true
  });
}

async function _delete(id) {
  return await Invoice.findByIdAndRemove({ _id: id });
}
