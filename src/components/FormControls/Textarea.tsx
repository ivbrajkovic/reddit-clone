import { useStyles } from "@/components/FormControls/styles";
import { Textarea as MantineTextarea } from "@mantine/core";
import { FC } from "react";

type TextInputProps = typeof MantineTextarea["defaultProps"] & {};

const Textarea: FC<TextInputProps> = (props) => {
  const { classes } = useStyles();
  return <MantineTextarea classNames={classes} {...props} />;
};
export default Textarea;
