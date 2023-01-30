import { createStyles } from "@mantine/core";
import { FC } from "react";

const useStyles = createStyles((theme) => ({
  icon: {
    cursor: "pointer",
    padding: 8,
    lineHeight: 0,
    borderRadius: "50%",

    color: theme.colorScheme === "dark" ? "inherit" : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.gray[7]
          : theme.colors.gray[1],
    },

    "&[data-hide=true]": {
      [theme.fn.smallerThan("md")]: {
        display: "none",
      },
    },
  },
  noPadding: {
    padding: 0,
  },
}));

type IconProps = {
  hideOnMobile?: boolean;
  noPadding?: boolean;
  title: string;
  icon: React.ReactNode;
};
const NavbarIcon: FC<IconProps> = ({
  hideOnMobile,
  noPadding,
  title,
  icon,
}) => {
  const { cx, classes } = useStyles();
  return (
    <a
      title={title}
      className={cx(classes.icon, noPadding && classes.noPadding)}
      data-hide={hideOnMobile}
    >
      {icon}
    </a>
  );
};

export default NavbarIcon;
