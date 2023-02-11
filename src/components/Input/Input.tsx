import { createStyles, Input as MantineInput } from "@mantine/core";
import { FC } from "react";

const useStyles = createStyles((theme) => ({
  textInput: {
    flex: 1,

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
  },
}));

type TextInputProps = typeof MantineInput["defaultProps"] & {};

const Input: FC<TextInputProps> = (props) => {
  const { classes } = useStyles();
  return <MantineInput className={classes.textInput} {...props} />;
};
export default Input;
