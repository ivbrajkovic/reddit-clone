import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  title: {},
  input: {
    backgroundColor: theme.colors.gray[1],
    "&:placeholder": {
      color: theme.colors.gray[5],
    },
    "&:hover": {
      bg: theme.white,
      border: "1px solid",
      borderColor: theme.colors.blue[5],
    },
    "&:focus": {
      outline: "none",
      bg: theme.white,
      border: "1px solid",
      borderColor: theme.colors.blue[5],
    },
  },
}));
