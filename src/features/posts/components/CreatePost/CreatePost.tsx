import { Textarea, TextInput } from "@/components/FormControls";
import ImageAndVideo from "@/features/posts/components/CreatePost/components/ImageAndVideo";
import Link from "@/features/posts/components/CreatePost/components/Link";
import PreviewImages from "@/features/posts/components/CreatePost/components/PreviewImages";
import SubmitButton from "@/features/posts/components/CreatePost/components/SubmitButton";
import TabList from "@/features/posts/components/CreatePost/components/TabList";
import {
  CreatePostFormProvider,
  useCreatePostForm,
} from "@/features/posts/components/CreatePost/createPostFormContext";

import { useCreatePost } from "@/features/posts/hooks/useCreatePost";
import { useStyles } from "@/features/posts/styles";
import { Tab } from "@/features/posts/types";
import { useEventCallback } from "@/hooks/useEventCallback";
import mergeArrays from "@/utility/mergeArrays";
import { Box, Paper, Tabs } from "@mantine/core";
import { FileWithPath } from "@mantine/dropzone";
import { isNotEmpty } from "@mantine/form";
import { useState } from "react";

const CreatePost = () => {
  const { classes } = useStyles();
  const [activeTab, setActiveTab] = useState<string | null>(Tab.Post);

  const { isLoading, createPost } = useCreatePost();

  const form = useCreatePostForm({
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

        <CreatePostFormProvider form={form}>
          <Box component="form" px="md" onSubmit={form.onSubmit(createPost)}>
            <TextInput
              mt="md"
              placeholder="Title"
              {...form.getInputProps("title")}
            />

            <Tabs.Panel value={Tab.Post}>
              <Textarea
                mt="md"
                placeholder="Text (optional)"
                {...form.getInputProps("body")}
              />
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
        </CreatePostFormProvider>
      </Tabs>
    </Paper>
  );
};

export default CreatePost;
