import { FileWithPath } from "@mantine/dropzone";
import { createFormContext } from "@mantine/form";

export type NewPostFormValues = {
  title: string;
  body: string;
  files: FileWithPath[];
};

export const [NewPostFormProvider, useNewPostFormContext, useNewPostForm] =
  createFormContext<NewPostFormValues>();