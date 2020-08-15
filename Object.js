let Core = require("./Core");
class CNObject extends Core {
  constructor() {
    super();
  }
  /**
   * Find items from the source object with the key name specified.
   * @param {any} o - Source object or object array.
   * @param {string} n - Key name to be found.
   * @returns {array} Object items array with the key name.
   * @example
   * let a = {v:1,n:{m:'hi'}};
   * findByKeyName(a,'m');
   * // return [{m:'hi'}]
   */
  static findByKeyName(o, n, res) {
    if (!res) res = [];
    if (Array.isArray(o)) {
      o.forEach((i) => {
        this.findByKeyName(i, n, res);
      });
    } else if (typeof o === "object") {
      for (let i in o) {
        if (i === n) {
          res.push(o);
          continue;
        }
        this.findByKeyName(o[i], n, res);
      }
    }
    return res;
  }
  /**
   * Find items from the source object with the value specified.
   * @param {any} o - Source object or object array.
   * @param {any} n - Value to be found.
   * @returns {array} Object items array with the value. {o,k} o for the object, k for the key which contains the value.
   * @example
   * let a = {v:1,n:{m:'hi'}};
   * findByValue(a,'hi');
   * // return [{o:{m:'hi'},k:'m'}]
   */
  static findByValue(o, v, res) {
    if (!res) res = [];
    if (Array.isArray(o)) {
      o.forEach((i) => {
        this.findByValue(i, v, res);
      });
    } else if (typeof o === "object") {
      for (let i in o) {
        if (o[i] === v) {
          res.push({ o: o, k: i });
          continue;
        }
        this.findByValue(o[i], v, res);
      }
    }
    return res;
  }
}
module.exports = CNObject;
