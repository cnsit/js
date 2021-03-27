let Core = require("./Core");
class Float extends Core {
  constructor(v) {
    super();
    if (Core.isValid(v)) {
      if (v instanceof Float) {
        this.value = { int: v.value.int, exp: v.value.exp };
      } else {
        this.wrap(v);
      }
    } else {
      this.wrap(0);
    }
  }
  wrap(v) {
    let d = null;
    if (typeof v === "object" && Core.isNumber(v.int) && Core.isNumber(v.exp)) {
      d = v;
    } else if (v === Infinity) {
      d = { int: Infinity, exp: 0 };
    } else {
      d = this.toInt(v);
    }
    if (!d) {
      throw "Float: invalid input value.";
    } else {
      this.value = d;
    }
  }
  toInt(v) {
    let s = v.toString();
    // get every part of our number
    var reg = /([+-]*)([0-9]+)\.*([0-9]*)([eE]*)([+-]*\d+)*/gi;
    var res = reg.exec(s);
    if (!Core.isValid(res)) return res;
    var ret = {};
    let sign = "+";
    if (Core.isValid(res[1])) {
      sign = res[1];
    }
    let intString = "0";
    if (Core.isNumber(res[2])) {
      intString = parseInt(res[2]).toString();
    }
    let decString = "";
    if (Core.isNumber(res[3])) {
      decString = res[3].substring(
        0,
        res[3].length - Float.countSuffixZeros(res[3])
      );
      if (decString === "0") decString = "";
    }
    if (Core.isNumber(res[5])) {
      ret.exp = parseInt(res[5]);
    } else {
      ret.exp = 0;
    }
    // now, let's analyze the number
    // console.log(v, ret.exp, intString, decString);
    intString = intString + decString;
    let zi = Float.countSuffixZeros(intString);
    ret.int = parseInt(sign + intString.substring(0, intString.length - zi));
    ret.exp = ret.exp - decString.length + zi; // 3.14e1 = 31.4, 31400 = 314e2
    return ret;
  }
  unpack(p = 12) {
    let v = parseFloat(
      (this.value.int * Math.pow(10, this.value.exp)).toPrecision(p)
    );
    return v;
  }
  /**
   * Count number of zeros from right
   * @param {number} s - The number.
   * @returns {number} Number of suffix zeros. If s=0, then return 0.
   */
  static countSuffixZeros(s) {
    let zi = 0;
    let l = s.toString().length - 1;
    // count how many surfix zeros we have
    for (let i = l; i >= 0; i--) {
      if (s[i] === "0") {
        zi++;
      } else {
        break;
      }
    }
    if (zi === l + 1) return 0; // int = '0'
    return zi;
  }
  static shiftLeft(n, l) {
    n.int *= Math.pow(10, l);
    n.exp -= l;
  }
  /**
   * Align 2 item's int and exp so their exps are the same.
   * @param {Type of n1} n1 - Parameter description.
   * @param {Type of n2} n2 - Parameter description.
   */
  static align(n1, n2) {
    let expMin = Math.min(n1.exp, n2.exp);
    // shift numbers to the same position
    if (n1.exp === expMin) {
      Float.shiftLeft(n2, n2.exp - expMin);
    } else {
      Float.shiftLeft(n1, n1.exp - expMin);
    }
  }
  add(v) {
    let n = this.param(v);
    Float.align(this.value, n);
    this.value.int += n.int;
    return this;
  }
  sub(v) {
    let n = this.param(v);
    Float.align(this.value, n);
    this.value.int -= n.int;
    return this;
  }
  mul(v) {
    let n = this.param(v);
    Float.align(this.value, n);
    this.value.int *= n.int;
    this.value.exp *= 2;
    this.wrap(this.unpack());
    return this;
  }
  div(v) {
    let n = this.param(v);
    Float.align(this.value, n);
    this.wrap((this.value.int /= n.int));
    return this;
  }
  pow(n) {
    this.wrap(Math.pow(this.unpack(), n));
    return this;
  }
  sqrt() {
    this.wrap(Math.sqrt(this.unpack()));
    return this;
  }
  /**
   * Prepare parameters to all calculations
   * @param {any} v - Parameter
   * @returns {object} Float Value {int, exp}
   */
  param(v) {
    let n = null;
    if (!(v instanceof Float)) {
      n = this.toInt(v);
    } else if (typeof v === "object") {
      n = v.value;
    } else {
      return 0;
    }
    return n;
  }
  equal(v) {
    let n = this.param(v);
    return n.int === this.value.int && n.exp === this.value.exp;
  }
  getInt() {
    return this.value.int;
  }
  getExp() {
    return this.value.exp;
  }
  /**
   * Get exponential number of the given scale.
   * @param {string} scale - Scale, like 'k', 'M' or etc.
   * @returns {number} The exponential number.
   */
  static getExpFromScale(scale) {
    let exp = 0;
    if (scale === "f") exp = -15;
    else if (scale === "p") exp = -12;
    else if (scale === "n") exp = -9;
    else if (scale === "µ" || scale === "u") exp = -6;
    else if (scale === "m") exp = -3;
    else if (scale === "c") exp = -2;
    else if (scale === "") exp = 0;
    else if (scale === "k" || scale === "K") exp = 3;
    else if (scale === "M") exp = 6;
    else if (scale === "G") exp = 9;
    else if (scale === "T") exp = 12;
    return exp;
  }
  /**
   * Calculate how many folders will be added to the float for a beautiful display.
   * @param {Float} f - A Float instance.
   * @returns {number} Scale folder number. exp -= 3*folder and scaleBaseIndex + folder.
   */
  static getBeautifyFactor(f) {
    // set beautiful unit
    // rules:
    // 1. 整数部分不可少于 1 位 (0)，小于则进入低一个量级
    // 2. 整数部分不可超过 3 位，超过则进入高一个量级
    // 2000000 => 2M
    // 200000 => 200k
    // 20000 => 20k
    // 2000 => 2k
    // 200
    // 20
    // 2
    // 0.2 => 200m
    // 0.02 => 20m
    // 0.002 => 2m
    // 0.0002 => 200u
    let diff = f.getInt().toString().length + f.getExp();
    // Num    diff        exp     factor          Math.floor
    // =============================================================
    // 1000   diff = 4    exp - 3 scaleIndex + 1  diff/3 = 1
    // 100    diff = 3    exp + 0                 diff/3 = 0
    // 10     diff = 2    exp + 0                 diff/3 = 0
    // 1      diff = 1    exp + 0                 diff/3 = 0
    // 0.1    diff = 0    exp + 3 scaleIndex - 1  ceil(diff/3) = 0
    // 0.01   diff = -1   exp + 3 scaleIndex - 1  ceil(diff/3) = 0
    // 0.001  diff = -2   exp + 3 scaleIndex - 1  ceil(diff/3) = 0
    // 0.0001 diff = -3   exp + 6 scaleIndex - 2  ceil(diff/3) = -1
    let factor = 0;
    if (diff > 0) {
      factor = Math.floor((diff - 1) / 3);
    } else {
      factor = Math.ceil(diff / 3) - 1;
    }
    return factor;
  }
}
module.exports = Float;
