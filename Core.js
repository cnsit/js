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
  static isNumber(n) {
    return (
      typeof n !== "undefined" &&
      n !== null &&
      !(n != n) &&
      n !== "" &&
      !isNaN(parseFloat(n))
    );
  }
}
module.exports = Core;
