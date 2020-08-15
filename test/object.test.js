const { CNObject } = require("../index");
const n1 = { n: "valley", z: 1 };
const f0 = { f: "bar", i: 0 };
const f_1 = { f: "go", i: -1 };
const d1 = { d: "dist", l: 1 };
const o1 = {
  a: "like",
  b: n1,
  c: [f0, f_1, d1],
  m: 1
};
test("find key name 'n'", () => {
  expect(CNObject.findByKeyName(o1, "n")).toStrictEqual([n1]);
});
test("find key name 'f'", () => {
  expect(CNObject.findByKeyName(o1, "f")).toStrictEqual([f0, f_1]);
});
test("find item with value 1", () => {
  expect(CNObject.findByValue(o1, 1)).toStrictEqual([
    { o: n1, k: "z" },
    { o: d1, k: "l" },
    { o: o1, k: "m" }
  ]);
});
test("find item with value 0", () => {
  expect(CNObject.findByValue(o1, 0)).toStrictEqual([{ o: f0, k: "i" }]);
});
test("find item with value 'go'", () => {
  expect(CNObject.findByValue(o1, "go")).toStrictEqual([{ o: f_1, k: "f" }]);
});
