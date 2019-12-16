class OrganizationViewModel {
  constructor() {
    this._id = "";
  }
  // code
  get code() {
    return this._code;
  }
  set code(code) {
    this._code = code;
  }
  // name
  get name() {
    return this._name;
  }
  set name(name) {
    this._name = name;
  }
  // description
  get description() {
    return this._description;
  }
  set description(desc) {
    this._description = desc;
  }
  // regdNum
  get regdNum() {
    return this._regdNum;
  }
  set regdNum(regdNum) {
    this._regdNum = regdNum;
  }
  // pan
  get pan() {
    return this._pan;
  }
  set pan(pan) {
    this._pan = pan;
  }
  // tan
  get tan() {
    return this._tan;
  }
  set tan(tan) {
    this._tan = tan;
  }
  // gstin
  get gstin() {
    return this._gstin;
  }
  set gstin(gstin) {
    this._gstin = gstin;
  }
  // active
  get active() {
    return this._active;
  }
  set active(active) {
    this._active = active;
  }
}

module.exports = { OrganizationViewModel };
