const { Float } = require("../index");
test("zero", () => {
  let v = 0;
  let f = new Float(v);
  expect(f.value).toStrictEqual({ int: 0, exp: 0 });

  f = new Float("0.0");
  expect(f.value).toStrictEqual({ int: 0, exp: 0 });
});
test("the pi", () => {
  let v = 3.14;
  let f = new Float(v);
  expect(f.value).toStrictEqual({ int: 314, exp: -2 });
  expect(f.unpack()).toBe(3.14);
});
test("the scientific", () => {
  let v = 3.14e1;
  let f = new Float(v);
  expect(f.value).toStrictEqual({ int: 314, exp: -1 });
  expect(f.unpack()).toBe(31.4);

  v = 3.014e1;
  f = new Float(v);
  expect(f.value).toStrictEqual({ int: 3014, exp: -2 });
  expect(f.unpack()).toBe(30.14);

  v = 3.14e4;
  f = new Float(v);
  expect(f.value).toStrictEqual({ int: 314, exp: 2 });
  expect(f.unpack()).toBe(31400);
  v = "3.14e4";
  f = new Float(v);
  expect(f.value).toStrictEqual({ int: 314, exp: 2 });
  expect(f.unpack()).toBe(31400);

  v = 3.014e-2;
  f = new Float(v);
  expect(f.value).toStrictEqual({ int: 3014, exp: -5 });
  expect(f.unpack()).toBe(0.03014);
  v = "3.014e-2";
  f = new Float(v);
  expect(f.value).toStrictEqual({ int: 3014, exp: -5 });
  expect(f.unpack()).toBe(0.03014);

  v = 0.0314e-2;
  f = new Float(v);
  expect(f.value).toStrictEqual({ int: 314, exp: -6 });
  expect(f.unpack()).toBe(0.000314);
});
test("the big numbers", () => {
  let v = 187310492.01732;
  let f = new Float(v);
  expect(f.value).toStrictEqual({ int: 18731049201732, exp: -5 });
  expect(f.unpack(15)).toBe(187310492.01732);

  v = 0.00812731;
  f = new Float(v);
  expect(f.value).toStrictEqual({ int: 812731, exp: -8 });
  expect(f.unpack()).toBe(0.00812731);
});
test("signs", () => {
  let v = -3.14;
  let f = new Float(v);
  expect(f.value).toStrictEqual({ int: -314, exp: -2 });
  expect(f.unpack()).toBe(v);
});
test("add", () => {
  let v = 0.1;
  let f = new Float(v);
  expect(f.add(0.2).value).toStrictEqual({ int: 3, exp: -1 });
  expect(f.add(0.02).value).toStrictEqual({ int: 32, exp: -2 });

  v = 10.1;
  f = new Float(v);
  expect(f.add(0.002).value).toStrictEqual({ int: 10102, exp: -3 });

  v = -10.17;
  f = new Float(v);
  expect(f.add(1.002).value).toStrictEqual({ int: -9168, exp: -3 });

  v = -1.002;
  f = new Float(v);
  expect(f.add(10.17).value).toStrictEqual({ int: 9168, exp: -3 });
});
test("sub", () => {
  let v = 0.3;
  let f = new Float(v);
  expect(f.sub(0.1).value).toStrictEqual({ int: 2, exp: -1 });

  v = 10.1;
  f = new Float(v);
  expect(f.sub(0.002).value).toStrictEqual({ int: 10098, exp: -3 });

  v = -10.17;
  f = new Float(v);
  expect(f.sub(1.002).value).toStrictEqual({ int: -11172, exp: -3 });

  v = -1.002;
  f = new Float(v);
  expect(f.sub(10.17).value).toStrictEqual({ int: -11172, exp: -3 });

  v = -1.002;
  f = new Float(v);
  expect(f.sub(-10.17).value).toStrictEqual({ int: 9168, exp: -3 });
});
test("mul", () => {
  let v = 0.11;
  let f = new Float(v);
  expect(f.mul(0.1).value).toStrictEqual({ int: 11, exp: -3 });

  f = new Float(1.1);
  let f2 = new Float(1.1);
  expect(f.mul(f2).value).toStrictEqual({ int: 121, exp: -2 });
});
test("div", () => {
  let v = 0.11;
  let f = new Float(v);
  expect(f.div(0.1).value).toStrictEqual({ int: 11, exp: -1 });
  expect(f.unpack()).toBe(1.1);
});
test("equal", () => {
  let v = 1;
  let f = new Float(v);
  expect(f.equal("1.")).toBeTruthy();
  expect(f.equal("1.0")).toBeTruthy();
});
test("scale", () => {
  expect(Float.getExpFromScale("p")).toBe(-12);
  expect(Float.getBeautifyFactor(new Float(0.0000314))).toBe(-2);
  expect(Float.getBeautifyFactor(new Float(0.000314))).toBe(-2);
  expect(Float.getBeautifyFactor(new Float(0.00314))).toBe(-1);
  expect(Float.getBeautifyFactor(new Float(0.0314))).toBe(-1);
  expect(Float.getBeautifyFactor(new Float(0.314))).toBe(-1);
  expect(Float.getBeautifyFactor(new Float(3.14))).toBe(0);
  expect(Float.getBeautifyFactor(new Float(31.4))).toBe(0);
  expect(Float.getBeautifyFactor(new Float(314.0))).toBe(0);
  expect(Float.getBeautifyFactor(new Float(3140))).toBe(1);
  expect(Float.getBeautifyFactor(new Float(31400))).toBe(1);
  expect(Float.getBeautifyFactor(new Float(314000))).toBe(1);
  expect(Float.getBeautifyFactor(new Float(3140000))).toBe(2);
});
