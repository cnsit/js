let Core = require("./Core");
class CNDate extends Core {
  constructor() {
    super();
  }
  static ping() {
    return "pong-date";
  }

  /**
   * Convert String to Date.
   * @param {String} s - String to be converted. Omit this parameter will use now as default.
   * @returns {Date} A Date instance of the input String, null if input is not valid.
   */
  static std(s) {
    if (!this.isValid(s)) {
      return new Date();
    } else if (typeof s === "string") {
      let ms = Date.parse(s);
      if (isNaN(ms)) {
        return null;
      } else {
        let d = new Date();
        d.setTime(ms);
        return d;
      }
    } else if (s instanceof Date) {
      return s;
    } else {
      return null;
    }
  }
  static ymd(r) {
    let d = this.std(r);
    if (this.isValid(d)) {
      return `${d.getFullYear()}-${(d.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
    } else {
      return null;
    }
  }
  static hm(r) {
    let d = this.std(r);
    if (this.isValid(d)) {
      return `${d
        .getHours()
        .toString()
        .padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
    } else {
      return null;
    }
  }
  static hms(r) {
    let d = this.std(r);
    if (this.isValid(d)) {
      return `${this.hm(d)}:${d.getSeconds().toString().padStart(2, "0")}`;
    } else {
      return null;
    }
  }
  static ymdhm(r) {
    let d = this.std(r);
    if (this.isValid(d)) {
      return `${this.ymd(d)} ${this.hm(d)}`;
    } else {
      return null;
    }
  }
  static diffDays(t, f) {
    let td = this.std(t);
    if (!this.isValid(td)) return null;
    let fd = this.std(f);
    if (!this.isValid(fd)) return null;
    return Math.floor((td - fd) / 86400000);
  }
}
module.exports = CNDate;
