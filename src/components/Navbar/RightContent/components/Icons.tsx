import NavbarIcon from "@/components/Navbar/RightContent/components/NavbarIcon";
import { Flex } from "@mantine/core";
import {
  BsArrowUpRightCircle,
  BsCameraVideo,
  BsChatDots,
  BsFilterCircle,
} from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import { VscAdd } from "react-icons/vsc";

const links = [
  { title: "link", icon: <BsArrowUpRightCircle fontSize={20} /> },
  { title: "filter", icon: <BsFilterCircle fontSize={20} /> },
  {
    hideOnMobile: true,
    title: "video",
    icon: <BsCameraVideo fontSize={20} />,
  },
  { hideOnMobile: true, title: "chat", icon: <BsChatDots fontSize={20} /> },
  {
    hideOnMobile: true,
    title: "notifications",
    icon: <IoNotificationsOutline fontSize={20} />,
  },
  { hideOnMobile: true, title: "add", icon: <VscAdd fontSize={20} /> },
];

const Icons = () => {
  return (
    <Flex gap={8} align="center">
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
