import { UseFormInput } from "@mantine/form/lib/types";

type FormProps<T> = UseFormInput<T, (values: T) => T> | undefined;

export type LoginFormValues = {
  email: string;
  password: string;
};

export type SignUpFormValues = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

export type ResetPasswordFormValues = {
  email: string;
};

export type LoginFormProps = FormProps<LoginFormValues>;
export type SignUpFormProps = FormProps<SignUpFormValues>;
export type ResetPasswordFormProps = FormProps<ResetPasswordFormValues>;
