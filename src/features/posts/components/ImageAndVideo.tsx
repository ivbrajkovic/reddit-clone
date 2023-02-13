import { Group, Text, useMantineTheme } from "@mantine/core";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { AiOutlineCloudUpload } from "react-icons/ai";

import { showNotificationError } from "@/common/showNotificationError";
import { useRenderCount } from "@/hooks/useRenderCount";
import { FC, memo } from "react";
import { IoClose, IoImageOutline } from "react-icons/io5";

type ImageAndVideoProps = {
  onDrop: (files: FileWithPath[]) => void;
};

const ImageAndVideo: FC<ImageAndVideoProps> = memo(({ onDrop }) => {
  useRenderCount("ImageAndVideo");
  const theme = useMantineTheme();

  // const onDrop = (files: FileWithPath[]) => {
  // const reader = new FileReader();
  // reader.onload = ({ target }) => {
  //   typeof target?.result === "string" && onFileSelect(target.result);
  // };
  // reader.onerror = () =>
  //   showNotificationError("Error reading file")(new Error());
  // reader.onloadstart = toggleLoading;
  // reader.onloadend = toggleLoading;
  // reader.readAsDataURL(files[0]);
  // };

  const onReject = () =>
    showNotificationError("Error uploading image")(new Error());

  return (
    <Dropzone
      mt="md"
      onDrop={onDrop}
      onReject={onReject}
      maxSize={3 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
    >
      <Group
        position="center"
        spacing="xl"
        style={{ minHeight: 220, pointerEvents: "none" }}
      >
        <Dropzone.Accept>
          <AiOutlineCloudUpload
            size={50}
            color={
              theme.colors[theme.primaryColor][
                theme.colorScheme === "dark" ? 4 : 6
              ]
            }
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IoClose
            size={50}
            color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IoImageOutline
            size={50}
            color={
              theme.colors[theme.primaryColor][
                theme.colorScheme === "dark" ? 4 : 6
              ]
            }
          />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag images here or click to select files
          </Text>
          <Text size="sm" color="dimmed" inline mt={7}>
            Attach as many files as you like, each file should not exceed 5mb
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
});

ImageAndVideo.displayName = "ImageAndVideoPanel";
export default ImageAndVideo;
