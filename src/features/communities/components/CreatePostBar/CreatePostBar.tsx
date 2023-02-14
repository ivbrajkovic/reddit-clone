import { TextInput } from "@/components/FormControls";
import { createStyles, Flex, Image, Paper } from "@mantine/core";
import { useRouter } from "next/router";
import { FC } from "react";
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

type CreatePostBarProps = {};

const CreatePostBar: FC<CreatePostBarProps> = () => {
  const { classes } = useStyles();
  const router = useRouter();
  const goToSubmit = () => {
    console.log("router.query.community", router.query.communityId);

    const { communityId } = router.query;
    if (communityId) {
      router.push(`/r/${router.query.communityId}/submit`);
      return;
    }
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

        <TextInput mr="xs" placeholder="Search Reddit" onClick={goToSubmit} />
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