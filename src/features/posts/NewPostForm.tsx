import ImageAndVideo from "@/features/posts/components/ImageAndVideo";
import Link from "@/features/posts/components/Link";
import Post from "@/features/posts/components/Post";
import PreviewImages from "@/features/posts/components/PreviewImages";
import SubmitButton from "@/features/posts/components/SubmitButton";
import TabList from "@/features/posts/components/TabList";
import TitleInput from "@/features/posts/components/TitleInput";
import {
  NewPostFormProvider,
  NewPostFormValues,
  useNewPostForm,
} from "@/features/posts/formContext";
import { useCreatePost } from "@/features/posts/hooks/useCreatePost";
import { useStyles } from "@/features/posts/styles";
import { Tab } from "@/features/posts/types";
import { useEventCallback } from "@/hooks/useEventCallback";
import { Box, Paper, Tabs } from "@mantine/core";
import { FileWithPath } from "@mantine/dropzone";
import { isNotEmpty } from "@mantine/form";
import { FC, useState } from "react";

type NewPostFormProps = {};

const NewPostForm: FC<NewPostFormProps> = () => {
  const { classes } = useStyles();
  const [activeTab, setActiveTab] = useState<string | null>(Tab.Post);

  const { createPost } = useCreatePost();

  const form = useNewPostForm({
    initialValues: { title: "", body: "", files: [] },
    validate: { title: isNotEmpty("Title cannot be empty") },
  });

  const readFiles = (files: FileWithPath[]) => {
    // TODO: Read all files
    // For now read only first file
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        console.log(
          "🚀 ~ file: NewPostForm.tsx:41 ~ reader.onload ~ readerEvent.target.result",
          readerEvent.target.result,
        );
      }
    };
  };

  const onSubmit = (values: NewPostFormValues) => {
    console.log("🚀 ~ file: NewPostForm.tsx:49 ~ onSubmit ~ values", values);
  };

  const onDrop = useEventCallback((files: FileWithPath[]) => {
    console.log("🚀 ~ file: NewPostForm.tsx:52 ~ onDrop ~ files", files);
    form.setFieldValue("files", [...form.values.files, ...files]);
  });

  return (
    <Paper withBorder shadow="sm">
      <Tabs value={activeTab} onTabChange={setActiveTab} classNames={classes}>
        <TabList activeTab={activeTab as Tab} />

        <NewPostFormProvider form={form}>
          <Box component="form" px="md" onSubmit={form.onSubmit(onSubmit)}>
            <TitleInput />
            <Tabs.Panel value={Tab.Post}>
              <Post />
            </Tabs.Panel>
            <Tabs.Panel value={Tab.ImageAndVideo}>
              <ImageAndVideo onDrop={onDrop} />
              <PreviewImages />
            </Tabs.Panel>
            <Tabs.Panel value={Tab.Link}>
              <Link />
            </Tabs.Panel>
            <SubmitButton />
          </Box>
        </NewPostFormProvider>
      </Tabs>
    </Paper>
  );
};

export default NewPostForm;
