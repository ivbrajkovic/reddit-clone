import { useEventCallback } from "@/hooks/useEventCallback";
import { defaultTo, F, not, pipe, tap } from "ramda";
import { useEffect, useRef, useState } from "react";

type ReadParams = [blob: Blob, encoding?: string];
type ReadResult = string | ArrayBuffer | null | undefined;

type FileReaderOptions = {
  method?:
    | "readAsText"
    | "readAsDataURL"
    | "readAsBinaryString"
    | "readAsArrayBuffer";
  disableLoaderNotification?: boolean;
  disableErrorNotification?: boolean;
  disableResultNotification?: boolean;
  onLoad?: (result: ReadResult) => void;
  onLoadStart?: (e: ProgressEvent<FileReader>) => void;
  onLoadEnd?: (e: ProgressEvent<FileReader>) => void;
  onError?: (message: string) => void;
};

const formatErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Unknown error";

const getResultFromProgressEvent = (e: ProgressEvent<FileReader>) =>
  e.target?.result ?? "Unknown result";

const getErrorFromProgressEvent = (e: ProgressEvent<FileReader>) =>
  e.target?.error?.message ?? "Unknown error";

export const useFileReader = ({
  method = "readAsDataURL",
  disableLoaderNotification = false,
  disableErrorNotification = false,
  disableResultNotification = false,
  onLoadStart,
  onLoadEnd,
  onLoad,
  onError,
}: FileReaderOptions = {}) => {
  const [error, setError] = useState<string>();
  const [result, setResult] = useState<ReadResult>(null);
  const [loading, setLoading] = useState(false);

  const readerRef = useRef<FileReader>();
  const promiseRef = useRef<Promise<ReadResult>>();

  const resetState = () => {
    onError && setError(undefined);
    onLoad && setResult(null);
    onLoadEnd && setLoading(false);
  };

  useEffect(() => {
    const reader = new FileReader();
    readerRef.current = reader;

    reader.onloadstart = (e) => {
      onLoadStart?.(e) ?? (!disableLoaderNotification && setLoading(true));
    };

    reader.onloadend = (e) => {
      onLoadEnd?.(e) ?? (!disableLoaderNotification && setLoading(false));
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const readFile = useEventCallback((...args: ReadParams) => {
    try {
      resetState();

      const promise = new Promise<ReadResult>((resolve, reject) => {
        if (!readerRef.current) return;

        readerRef.current.onload = pipe(
          getResultFromProgressEvent,
          tap(
            defaultTo(not(disableResultNotification) ? setResult : F, onLoad),
          ),
          resolve,
        );

        readerRef.current.onerror = pipe(
          getErrorFromProgressEvent,
          tap(defaultTo(not(disableErrorNotification) ? setError : F, onError)),
          reject,
        );
      });

      promiseRef.current = promise;

      // Read file
      readerRef.current?.[method](...args);

      return promise;
    } catch (error) {
      pipe(formatErrorMessage, defaultTo(setError, onError))(error);
      return Promise.reject(error as Error);
    }
  });

  return [{ result, error, loading }, readFile] as const;
};
