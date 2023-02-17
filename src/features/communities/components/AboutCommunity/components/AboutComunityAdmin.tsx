import { useCommunityImageUpload } from "@/features/communities/hooks/useCommunityImage";
import {
  Box,
  createStyles,
  FileInput,
  Image,
  Loader,
  Text,
} from "@mantine/core";
import { FC } from "react";
import { FaReddit } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";

const useStyles = createStyles((theme) => ({
  uploadImageContainer: {
    display: "grid",
    alignItems: "flex-end",
    gridGap: theme.spacing.xl,
    gridTemplateColumns: "minmax(0, 1fr) 42px",
  },
  image: {},
  icon: {
    fontSize: 40,
    color: theme.colors.red[theme.colorScheme === "dark" ? 4 : 6],
  },
}));

type AboutCommunityAdminProps = {
  isVisible: boolean;
  imageUrl: string | null;
  communityId: string;
};

const AboutCommunityAdmin: FC<AboutCommunityAdminProps> = ({
  isVisible,
  imageUrl,
  communityId,
}) => {
  const { classes } = useStyles();
  const { isLoading, uploadCommunityImage } = useCommunityImageUpload();

  const onChange = async (file: File) =>
    uploadCommunityImage(communityId, file);

  if (!isVisible) return null;

  return (
    <Box>
      <Text mb={4} fz="sm" fw="600">
        Admin
      </Text>

      <Box className={classes.uploadImageContainer}>
        <FileInput
          disabled={isLoading}
          label="Community image"
          labelProps={{ color: "gray", fz: "8pt" }}
          placeholder="Upload image"
          icon={isLoading ? <Loader size="xs" /> : <FiUpload />}
          onChange={onChange}
        />

        {imageUrl ? (
          <Image
            src={imageUrl}
            fit="cover"
            width={42}
            height={42}
            radius="xl"
            alt=""
          />
        ) : (
          <FaReddit className={classes.icon} />
        )}
      </Box>
    </Box>
  );
};
export default AboutCommunityAdmin;
