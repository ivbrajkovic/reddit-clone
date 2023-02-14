import { Box, BoxProps, createStyles, Text } from "@mantine/core";
import { FC } from "react";

const useStyles = createStyles((theme) => ({
  button: {
    cursor: "pointer",
    padding: 8,
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[6],

    transition: "background-color 100ms ease-in-out",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[2],
    },
  },
  title: {
    marginLeft: theme.spacing.xs,
    lineHeight: 1,
    fontSize: "10pt",
    fontWeight: 700,
  },
}));

type FooterButtonProps = BoxProps & {
  title?: string;
  icon: JSX.Element;
  onClick?: () => void;
};

const FooterButton: FC<FooterButtonProps> = ({
  title,
  icon,
  onClick,
  ...props
}) => {
  const { classes } = useStyles();
  return (
    <Box className={classes.button} {...props}>
      {icon}
      {title ? <Text className={classes.title}>{title}</Text> : null}
    </Box>
  );
};
export default FooterButton;
