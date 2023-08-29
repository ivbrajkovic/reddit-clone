import { FileWithPath } from "@mantine/dropzone";
import { createFormContext } from "@mantine/form";

export type CreatePostFormValues = {
  title: string;
  body: string;
  files: FileWithPath[];
};

export const [
  CreatePostFormProvider,
  useCreatePostFormContext,
  useCreatePostForm,
] = createFormContext<CreatePostFormValues>();
