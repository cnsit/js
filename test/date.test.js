const { CNDate } = require("../index");
test("today is a good day", () => {
  let d1 = "2020-01-02";
  let d2 = "2020-01-07";
  let t1 = d1 + " 13:00";
  expect(CNDate.ymd(d1)).toBe(d1);
  expect(CNDate.ymdhm(t1)).toBe(t1);
  expect(CNDate.diffDays(d2, d1)).toBe(5);
});
