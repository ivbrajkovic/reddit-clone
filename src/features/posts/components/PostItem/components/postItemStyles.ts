import { createStyles } from "@mantine/core";

const usePostItemStyles = createStyles((theme) => ({
  postItem: {
    cursor: "pointer",
    "&:hover": {
      borderColor: theme.colors.blue[5],
    },
  },
  leftSide: {
    alignSelf: "stretch",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : "white",
  },
}));

export default usePostItemStyles;
