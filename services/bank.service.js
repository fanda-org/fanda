const Bank = require('../_helpers/db').Bank;

class BankService {
  static async getAll(query, orgId) {
    const reqQuery = { ...{ organization: orgId }, ...query };
    return await Bank.apiQuery(reqQuery).select(
      'accountNumber shortName bankName accountType ifscCode micrCode branchCode branchName active'
    );
  }

  static async getById(id) {
    return await Bank.findById(id);
  }

  static async create(bankParam, orgId) {
    /*
     * const bank = req.body
     * bank.organization = req.params.orgId
     */
    bankParam.organization = orgId;
    return await Bank.create(bankParam);
  }

  static async update(id, bankParam) {
    return await Bank.findByIdAndUpdate({ _id: id }, bankParam, { new: true, runValidators: true });
  }

  static async delete(id) {
    return await Bank.findByIdAndRemove({ _id: id });
  }
}

/*
 * const bankService = new BankService()
 * export { bankService }
 * export default { list, get, create, update, delete: deleteBank }
 */

module.exports = BankService;
