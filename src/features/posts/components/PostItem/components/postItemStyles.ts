import { createStyles } from "@mantine/core";

const usePostItemStyles = createStyles(
  (theme, params: { isPostPage: boolean }) => ({
    postItem: {
      cursor: params?.isPostPage ? "default" : "pointer",
      position: "relative",
      "&:hover": {
        borderColor: params?.isPostPage ? "none" : theme.colors.blue[5],
      },
    },
    leftSide: {
      alignSelf: "stretch",
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[1],
    },
  }),
);

export default usePostItemStyles;
