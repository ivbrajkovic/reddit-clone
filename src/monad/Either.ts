type LeftOrRight<T> = [T] extends [null]
  ? Left<T>
  : T extends { _type: "Left" }
  ? Left<T>
  : Right<NonNullable<T>>;

const fromNullable = <T>(x: T) =>
  (x === null || x === undefined || isLeft(x)
    ? Left(x)
    : _Right(x)) as LeftOrRight<T>;

const isLeft = <T>(x: any): x is Left<T> => x._type === "Left";
const isRight = <T>(x: any): x is Left<T> => x._type === "Right";

type Base<T> = {
  _type?: "Left" | "Right";
  emit: () => T;
  inspect: () => string;
};
const base = <T, K>(x: T): Base<T> => ({
  emit: () => x,
  inspect() {
    return `${this._type}(${x})`;
  },
});

type Left<T> = Base<T> & {
  _type: "Left";
  map(f: (x: T) => unknown): Left<T>;
  fork: <S>(f: (x: T) => S, g: (x: unknown) => unknown) => S;
  log: () => Left<T>;
};
const Left = <T>(x: T): Left<T> => ({
  ...base(x),
  _type: "Left",
  log() {
    console.log(`Left(${x})`);
    return this;
  },
  map(f) {
    return this;
  },
  fork: (f, _) => f(x),
});

type Right<T> = Base<T> & {
  _type: "Right";
  log: () => LeftOrRight<T>;
  map: <U>(f: (x: T) => U) => LeftOrRight<U>;
  fork: <S>(f: (x: unknown) => unknown, g: (x: T) => S) => S;
};
const _Right = <T>(x: T): Right<T> => ({
  ...base(x),
  _type: "Right",
  log() {
    console.log(`Right(${x})`);
    return this as LeftOrRight<T>;
  },
  map: (f) => fromNullable(f(x)),
  fork: (_, g) => g(x),
});

function Right<T>(x: T) {
  return fromNullable(x);
}
const Either = Object.freeze({ of: <T>(x: T) => fromNullable(x) });

export { Either };
