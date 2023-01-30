import { createStyles } from "@mantine/core";
import { FC } from "react";

const useStyles = createStyles((theme) => ({
  icon: {
    cursor: "pointer",
    height: 32,
    width: 32,
    lineHeight: 0,
    borderRadius: 2,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    color: theme.colorScheme === "dark" ? "inherit" : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.gray[7]
          : theme.colors.gray[2],
    },

    "&[data-hide=true]": {
      [theme.fn.smallerThan("md")]: {
        display: "none",
      },
    },
  },
}));

type IconProps = {
  hideOnMobile?: boolean;
  title: string;
  children: React.ReactNode;
};
const NavbarLink: FC<IconProps> = ({ hideOnMobile, title, children }) => {
  const { classes } = useStyles();
  return (
    <a title={title} className={classes.icon} data-hide={hideOnMobile}>
      {children}
    </a>
  );
};

export default NavbarLink;
