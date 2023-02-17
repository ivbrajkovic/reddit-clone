import { createStyles } from "@mantine/core";

const usePostItemStyles = createStyles((theme) => ({
  postItem: {
    position: "relative",
    cursor: "pointer",
    "&:hover": {
      borderColor: theme.colors.blue[5],
    },
  },
  leftSide: {
    alignSelf: "stretch",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : "white",
  },
}));

export default usePostItemStyles;
