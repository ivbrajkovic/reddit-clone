import { UseFormReturnType } from "@mantine/form";

type Values<T> = T extends UseFormReturnType<T> ? T : never;

type V = Values<{
  communityName: string;
  communityType: string;
  adultContent: boolean;
}>;

type FormValues = Record<string, unknown>;

type SetFieldError = <T>(
  form: UseFormReturnType<T>,
  field: keyof T,
  error: string,
) => void;

export const setFieldError: SetFieldError = (form, field, error) =>
  form.setFieldError(field, error);
