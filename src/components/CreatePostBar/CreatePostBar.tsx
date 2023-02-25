import { TextInput } from "@/components/FormControls";
import { openAuthModal } from "@/features/auth/authSlice";
import { useUser } from "@/features/auth/hooks/useSignedInUser";
import { setDirectoryOpen } from "@/features/directory/directorySlice";
import { useAppDispatch } from "@/store/hooks";
import { createStyles, Flex, Image, Paper } from "@mantine/core";
import { useRouter } from "next/router";
import { IoImageOutline } from "react-icons/io5";
import { TfiLink } from "react-icons/tfi";

const useStyles = createStyles((theme) => ({
  userImageWrapper: {
    cursor: "pointer",
    borderRadius: "50%",
    backgroundColor: theme.colorScheme === "dark" ? "#818384" : "#d7dfe2",
  },
  userImage: {
    filter: `brightness(${theme.colorScheme === "dark" ? "15%" : "100%"})`,
  },
  iconContainer: {
    cursor: "pointer",
    width: 38,
    height: 38,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "4px",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[2],
    },
  },
  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[6],
  },
}));

const CreatePostBar = () => {
  const { classes } = useStyles();
  const router = useRouter();
  const user = useUser();
  const dispatch = useAppDispatch();

  const goToSubmit = () => {
    const { communityId } = router.query;
    !user
      ? dispatch(openAuthModal("login"))
      : !communityId
      ? dispatch(setDirectoryOpen(true))
      : router.push(`/r/${communityId}/submit`);
  };

  return (
    <Paper withBorder p={8} shadow="sm">
      <Flex align="center">
        <Image
          src="/images/reddit-user.svg"
          alt="reddit user"
          width={38}
          height={38}
          mr="xs"
          onClick={goToSubmit}
          styles={{
            root: classes.userImageWrapper as any,
            image: classes.userImage as any,
          }}
        />
        <TextInput mr="xs" placeholder="Create Post" onClick={goToSubmit} />
        <div className={classes.iconContainer} onClick={goToSubmit}>
          <IoImageOutline className={classes.icon} fontSize={24} />
        </div>
        <div className={classes.iconContainer} onClick={goToSubmit}>
          <TfiLink className={classes.icon} fontSize={22} />
        </div>
      </Flex>
    </Paper>
  );
};
export default CreatePostBar;
