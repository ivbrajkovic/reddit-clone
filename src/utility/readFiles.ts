type Method =
  | "readAsText"
  | "readAsDataURL"
  | "readAsBinaryString"
  | "readAsArrayBuffer";

export const readFiles = async (
  blobs: Blob[],
  method: Method = "readAsText",
  encoding?: string,
) => {
  const files = blobs.map((blob) => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
      reader[method](blob, encoding);
    });
  });
  return Promise.all(files);
};
