export type Fn = <T>(...args: T[]) => unknown;

const apply: Fn = (x, f) => f(x);

export const mapperFn: Fn =
  (f): Fn =>
  (r): Fn =>
  (acc, x) =>
    r(acc, f(x));

export const filtererFn: Fn =
  (p): Fn =>
  (r): Fn =>
  (acc, x) =>
    p(x) ? r(acc, x) : acc;

export const pipe: Fn =
  (...fns) =>
  <T>(x: T) =>
    fns.reduceRight(apply, x);

export const concat = <T>(x: T[], y: T) => (x.push(y), x);
