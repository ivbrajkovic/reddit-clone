import { createStyles, Flex } from "@mantine/core";
import { FC } from "react";
import { BsArrowUpRightCircle, BsChatDots } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import {
  IoFilterCircleOutline,
  IoNotificationsOutline,
  IoVideocamOutline,
} from "react-icons/io5";

const useStyles = createStyles((theme) => ({
  icon: {
    cursor: "pointer",
    padding: 8,
    borderRadius: theme.radius.xl,

    "&:hover": {
      backgroundColor: theme.colors.gray[1],
    },

    "&[data-hide=true]": {
      [theme.fn.smallerThan("md")]: {
        display: "none",
      },
    },
  },
}));

const links = [
  { title: "link", icon: <BsArrowUpRightCircle fontSize={20} /> },
  { title: "filter", icon: <IoFilterCircleOutline fontSize={24} /> },
  {
    hideOnMobile: true,
    title: "video",
    icon: <IoVideocamOutline fontSize={22} />,
  },
  { hideOnMobile: true, title: "chat", icon: <BsChatDots fontSize={20} /> },
  {
    hideOnMobile: true,
    title: "notifications",
    icon: <IoNotificationsOutline fontSize={20} />,
  },
  { hideOnMobile: true, title: "add", icon: <GrAdd /> },
];

type IconProps = {
  hideOnMobile?: boolean;
  title: string;
  icon: React.ReactNode;
};
const NavbarIcon: FC<IconProps> = ({ hideOnMobile, title, icon }) => {
  const { classes } = useStyles();
  return (
    <button
      type="button"
      title={title}
      className={classes.icon}
      data-hide={hideOnMobile}
    >
      {icon}
    </button>
  );
};

const Icons = () => {
  return (
    <Flex gap={8}>
      {links.map((link) => (
        <NavbarIcon
          key={link.title}
          title={link.title}
          icon={link.icon}
          hideOnMobile={link.hideOnMobile}
        />
      ))}
    </Flex>
  );
};
export default Icons;
