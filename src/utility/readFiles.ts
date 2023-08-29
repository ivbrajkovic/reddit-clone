type Method =
  | "readAsText"
  | "readAsDataURL"
  | "readAsBinaryString"
  | "readAsArrayBuffer";

type R<T> = T extends "readAsText"
  ? string
  : T extends "readAsDataURL"
  ? string
  : T extends "readAsBinaryString"
  ? string
  : ArrayBuffer | null;

export const readFiles = async <M extends Method>(
  blobs: Blob[],
  method: M = "readAsDataURL" as M,
  encoding?: string,
) => {
  const files = blobs.map((blob) => {
    const reader = new FileReader();
    return new Promise<R<M>>((resolve, reject) => {
      reader.onload = () => resolve(reader.result as R<M>);
      reader.onerror = () => reject(reader.error);
      reader[method](blob, encoding);
    });
  });
  return Promise.all(files);
};
