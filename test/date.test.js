const { Date } = require("../index");
test("today is a good day", () => {
  let d1 = "2020-01-02";
  let d2 = "2020-01-07";
  let t1 = d1 + " 13:00";
  expect(Date.ymd(d1)).toBe(d1);
  expect(Date.ymdhm(t1)).toBe(t1);
  expect(Date.diffDays(d2, d1)).toBe(5);
});
