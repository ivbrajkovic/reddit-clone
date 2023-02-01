import { fromNullable } from "fp-ts/Either";

// type F<T> = (x: T) => typeof Right<F<T>>;

// export const Right = <T>(x: T) => ({
//   chain: (f: F<T>) => f(x),
//   emit: () => x,
//   map: (f: F<T>) => MaybeOf2(f(x)),
//   fork: (_: F<T>, g: F<T>) => g(x),
//   isJust: true,
//   isNothing: false,
//   inspect: () => `Right(${x})`,
// });

// export const Left = <T>(x: T) => ({
//   chain: (_: F<T>) => Left(x),
//   emit: () => Left(x),
//   map: (_: F<T>) => Left(x),
//   fork: (f: Function, _: F<T>) => f(x),
//   isJust: false,
//   isNothing: true,
//   inspect: () => `Left(${x})`,
// });

// export const MaybeOf = <T>(x: T) =>
//   x === null ||
//   x === undefined ||
//   (typeof x === "object" && "isNothing" in x && x.isNothing)
//     ? Left(x)
//     : Right(x);

// export const MaybeOf2 = <T>(x: T) => Right(x);

// export const tryCatch = <T>(f: F<T>) => {
//   try {
//     return Right(f());
//   } catch (e) {
//     return Left(e instanceof Error ? e : new Error("unknown error"));
//   }
// };

const user = fromNullable(null)({
  name: "John",
  age: 20,
});

const name = user._tag === "Right" ? user.right.name : "Unknown";

// .map((x) => x.name)
// .map((x) => x.name)
// .emit();
