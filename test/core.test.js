const { Core } = require("../index");
test("ping should return pong", () => {
  expect(Core.ping()).toBe("pong");
});
test("null is invalid", () => {
  expect(Core.isValid(null)).toBe(false);
  expect(Core.isValid()).toBe(false);
  expect(Core.isValid(undefined)).toBe(false);
  expect(Core.isValid("this")).toBe(true);
});
