import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  root: {
    flex: 1,
  },
  input: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[1],

    "&:hover": {
      border: "1px solid",
      borderColor: theme.colors.blue[4],
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
    },

    "&:focus": {
      outline: "none",
      border: "1px solid",
      borderColor: theme.colors.blue[4],
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
    },
  },
}));
