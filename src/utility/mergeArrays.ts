type Key = string | number;

interface Acc<T extends Record<Key, any>> {
  result: T[];
  keys: { [key: Key]: number };
}

const mergeArrays = <T extends Record<Key, any>, K extends keyof T>(
  propName: K,
  ...arrays: Array<Array<T>>
): T[] => {
  return arrays.flat().reduce(
    (acc, curr, index) => {
      const key = curr[propName];
      const keyIndex = acc.keys[key];

      if (keyIndex !== undefined) {
        acc.result[keyIndex] = curr;
      } else {
        acc.keys[key] = index;
        acc.result.push(curr);
      }

      return acc;
    },
    { result: [], keys: {} } as Acc<T>,
  ).result;
};

export default mergeArrays;
