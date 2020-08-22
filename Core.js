class Core {
  constructor() {}
  static ping() {
    return "pong";
  }
  static isValid(v) {
    return !(typeof v === "undefined" || !v);
  }
  static isFunction(v) {
    return Core.isValid(v) && typeof v === "function";
  }
}
module.exports = Core;
