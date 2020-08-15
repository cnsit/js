class Core {
  constructor() {}
  static ping() {
    return "pong";
  }
  static isValid(v) {
    return !(typeof v === "undefined" || !v);
  }
}
module.exports = Core;
