let Core = require("./Core");
class Float extends Core {
  constructor(v) {
    super();
    if (Core.isValid(v)) {
      this.wrap(v);
    }
  }
  wrap(v) {
    let d = this.toInt(v);
    if (!d) {
      throw "Invalid input value.";
    }
    this.value = d;
  }
  isNumber(n) {
    return typeof n !== "undefined" && n !== null && !(n != n) && n !== "";
  }
  toInt(v) {
    let s = v.toString();
    // get every part of our number
    var reg = /([+-]*)([0-9]+)\.*([0-9]*)([eE]*)([+-]*\d+)*/gi;
    var res = reg.exec(s);
    if (!this.isNumber(res)) return res;
    var ret = {};
    let sign = "+";
    if (this.isNumber(res[1])) {
      sign = res[1];
    }
    let intString = "0";
    if (this.isNumber(res[2])) {
      intString = parseInt(res[2]).toString();
    }
    let decString = "";
    if (this.isNumber(res[3])) {
      decString = res[3].substring(
        0,
        res[3].length - this.countSuffixZeros(res[3])
      );
    }
    if (this.isNumber(res[5])) {
      ret.exp = parseInt(res[5]);
    } else {
      ret.exp = 0;
    }
    // now, let's analyze the number
    // console.log(v, ret.exp, intString, decString);
    intString = intString + decString;
    let zi = this.countSuffixZeros(intString);
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
  countSuffixZeros(s) {
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
    let n = this.toInt(v);
    Float.align(this.value, n);
    this.value.int += n.int;
    return this;
  }
  sub(v) {
    let n = this.toInt(v);
    Float.align(this.value, n);
    this.value.int -= n.int;
    return this;
  }
  mul(v) {
    let n = this.toInt(v);
    Float.align(this.value, n);
    this.value.int *= n.int;
    this.value.exp *= 2;
    this.wrap(this.unpack());
    return this;
  }
  div(v) {
    let n = this.toInt(v);
    Float.align(this.value, n);
    this.wrap((this.value.int /= n.int));
    return this;
  }
}
module.exports = Float;
