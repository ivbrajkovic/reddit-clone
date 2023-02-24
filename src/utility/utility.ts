import { FirebaseError } from "firebase/app";
import { MouseEventHandler } from "react";

export const isDevEnv = () => process.env.NODE_ENV === "development";

export const isString = (value: unknown): value is string =>
  typeof value === "string";

export const isError = (value: unknown): value is Error =>
  value instanceof Error;

export const isFirebaseError = (value: unknown): value is FirebaseError =>
  isError(value) && "code" in value;

export const isNotNil = <T>(value: T): boolean =>
  value !== null && value !== undefined;

export const isNotUndefined = <T>(value: T | undefined): value is T =>
  value !== undefined;

export const jsonParseStringify = <T>(props: T): T =>
  JSON.parse(JSON.stringify(props));

export const pipeLog = <T>(x: T, label: string = "x ->"): T => (
  console.log(label, x), x
);

export const isNullOrUndefined = <T>(value: T): boolean =>
  value === null || value === undefined;

export const stopPropagation: MouseEventHandler<any> = (e) =>
  e.stopPropagation();

export const filterByCommunityId = <T extends { communityId: string }>(
  communityId: string,
  arr: T[],
) => arr.filter((item) => item.communityId !== communityId);

export const filterById = <T extends { id: string }>(id: string, arr: T[]) =>
  arr.filter((item) => item.id !== id);

export const findById = <T extends { id: string }>(id: string, arr: T[]) =>
  arr.find((item) => item.id === id);

export const findByCommunityId = <T extends { communityId: string }>(
  communityId: string,
  arr: T[],
) => arr.find((item) => item.communityId === communityId);

export const delayFn = (fn: () => void, delay: number) => () =>
  setTimeout(fn, delay);

export const isThruty = (value: any): value is true => !!value;

export const runIfThruty = (value: any) => (fn: () => void) =>
  isThruty(value) && fn();

const isFunction = (value: unknown): value is Function =>
  typeof value === "function";

export const runIfDefined =
  <T extends any, R>(fn?: (arg0: T) => R) =>
  (arg0: T) => {
    isFunction(fn) && fn(arg0);
    return arg0;
  };

export const delayFnAsync =
  <R>(fn: () => R, delay: number) =>
  () =>
    new Promise<R>((resolve) => setTimeout(() => resolve(fn()), delay));
