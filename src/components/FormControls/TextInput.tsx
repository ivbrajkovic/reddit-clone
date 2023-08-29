import { useStyles } from "@/components/FormControls/styles";
import { TextInput as MantineTextInput } from "@mantine/core";
import { FC } from "react";

type TextInputProps = typeof MantineTextInput["defaultProps"] & {};

const TextInput: FC<TextInputProps> = (props) => {
  const { classes } = useStyles();
  return <MantineTextInput classNames={classes} {...props} />;
};
export default TextInput;
