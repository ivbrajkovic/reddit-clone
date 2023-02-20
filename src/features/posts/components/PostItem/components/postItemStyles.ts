import { createStyles } from "@mantine/core";

const usePostItemStyles = createStyles(
  (theme, params: { isSelectable: boolean }) => ({
    postItem: {
      cursor: params?.isSelectable ? "pointer" : "default",
      position: "relative",
      "&:hover": {
        borderColor: theme.colors.blue[5],
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
