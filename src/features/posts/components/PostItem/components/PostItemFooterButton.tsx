import { Box, BoxProps, createStyles, Text } from "@mantine/core";
import { ComponentPropsWithoutRef, forwardRef } from "react";

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

type FooterButtonProps = import("@mantine/utils").PolymorphicComponentProps<
  "div",
  BoxProps
> &
  ComponentPropsWithoutRef<"div"> & {
    title?: string;
    icon: JSX.Element;
  };

const FooterButton = forwardRef<HTMLDivElement, FooterButtonProps>(
  ({ title, icon, ...props }: FooterButtonProps, ref) => {
    const { classes } = useStyles();
    return (
      <Box ref={ref} className={classes.button} {...props}>
        {icon}
        {title ? <Text className={classes.title}>{title}</Text> : null}
      </Box>
    );
  },
);

FooterButton.displayName = "FooterButton";
export default FooterButton;
