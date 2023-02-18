import { MergeUnion } from "@/types";

type MergeIfNotNilRet<
  T extends object | null | undefined,
  U extends object,
> = T extends null | undefined ? T : MergeUnion<T & U>;

// prettier-ignore
type MergeIfNotNilFn = 
  <Source extends object>(source: Source) => 
    <Target extends object | null | undefined>(target: Target) =>
      MergeIfNotNilRet<Target, Source>;

// prettier-ignore
export const mergeIfNotNil: MergeIfNotNilFn = 
  (source) =>
    (target) => 
      target
        && typeof target === "object" 
        && (Object.assign(target, source) as any);

// const a = mergeIfNotNil({ c: 3 })({ a: 1, b: 1 });
// const b = mergeIfNotNil({ b: 2 })(null);
// const c = mergeIfNotNil({ b: 2 })(undefined);
