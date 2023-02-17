import { readFiles } from "@/utility/readFiles";
import {
  Box,
  createStyles,
  FileInput,
  Group,
  Image,
  Text,
} from "@mantine/core";
import { FC, useState } from "react";
import { FaReddit } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";

const useStyles = createStyles((theme) => ({
  uploadImageContainer: {
    display: "grid",
    alignItems: "center",
    gridGap: theme.spacing.md,
    gridTemplateColumns: "minmax(0, 1fr) auto",
  },
  image: {},
  icon: {
    fontSize: 40,
    color:
      theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6],
  },
}));

type AboutCommunityAdminProps = {
  isVisible: boolean;
  imageUrl: string | null;
};

const AboutCommunityAdmin: FC<AboutCommunityAdminProps> = ({
  isVisible,
  imageUrl,
}) => {
  const { classes } = useStyles();
  const [uploadedImage, setUploadedImage] = useState("");

  const onChange = async (file: File) => {
    const readFile = await readFiles([file], "readAsDataURL");
    setUploadedImage(readFile[0]);
  };

  if (!isVisible) return null;

  return (
    <Box>
      <Text mb={4} fz="sm" fw="600">
        Admin
      </Text>

      <Box className={classes.uploadImageContainer}>
        <FileInput
          placeholder="Upload image"
          icon={<FiUpload />}
          onChange={onChange}
        />

        <Group position="right">
          {imageUrl || uploadedImage ? (
            <Image
              src={uploadedImage || imageUrl}
              fit="contain"
              alt=""
              styles={{ image: { maxHeight: 40 } }}
            />
          ) : (
            <FaReddit className={classes.icon} />
          )}
        </Group>
      </Box>
    </Box>
  );
};
export default AboutCommunityAdmin;
