const { Date } = require("../index");
test("today is a good day", () => {
  let d = "2020-01-02";
  expect(Date.ymd(d)).toBe(d);
});
