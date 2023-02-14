import ImageAndVideo from "@/features/posts/components/ImageAndVideo";
import Link from "@/features/posts/components/Link";
import Post from "@/features/posts/components/Post";
import PreviewImages from "@/features/posts/components/PreviewImages";
import SubmitButton from "@/features/posts/components/SubmitButton";
import TabList from "@/features/posts/components/TabList";
import TitleInput from "@/features/posts/components/TitleInput";
import {
  NewPostFormProvider,
  useNewPostForm,
} from "@/features/posts/context/formContext";
import { useCreatePost } from "@/features/posts/hooks/useCreatePost";
import { useStyles } from "@/features/posts/styles";
import { Tab } from "@/features/posts/types";
import { useEventCallback } from "@/hooks/useEventCallback";
import mergeArrays from "@/utility/mergeArrays";
import { Box, Paper, Tabs } from "@mantine/core";
import { FileWithPath } from "@mantine/dropzone";
import { isNotEmpty } from "@mantine/form";
import { FC, useState } from "react";

type NewPostFormProps = {};

const NewPostForm: FC<NewPostFormProps> = () => {
  const { classes } = useStyles();
  const [activeTab, setActiveTab] = useState<string | null>(Tab.Post);

  const { isLoading, createPost } = useCreatePost();

  const form = useNewPostForm({
    initialValues: { title: "", body: "", files: [] },
    validate: { title: isNotEmpty("Title cannot be empty") },
  });

  // Extracted this function from the component to prevent re-rendering dropzone
  const onFileSelect = useEventCallback((files: FileWithPath[]) => {
    if (!files.length) return;
    const newFiles = mergeArrays("name", form.values.files, files);
    form.setFieldValue("files", newFiles);
  });

  return (
    <Paper withBorder shadow="sm">
      <Tabs value={activeTab} onTabChange={setActiveTab} classNames={classes}>
        <TabList activeTab={activeTab as Tab} />

        <NewPostFormProvider form={form}>
          <Box component="form" px="md" onSubmit={form.onSubmit(createPost)}>
            <TitleInput />

            <Tabs.Panel value={Tab.Post}>
              <Post />
            </Tabs.Panel>
            <Tabs.Panel value={Tab.ImageAndVideo}>
              <ImageAndVideo onDrop={onFileSelect} />
              <PreviewImages />
            </Tabs.Panel>
            <Tabs.Panel value={Tab.Link}>
              <Link />
            </Tabs.Panel>

            <SubmitButton isLoading={isLoading} />
          </Box>
        </NewPostFormProvider>
      </Tabs>
    </Paper>
  );
};

export default NewPostForm;
