import NavbarLink from "@/components/Navbar/NavbarLink";
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
  { title: "add", icon: <VscAdd fontSize={20} /> },
];

const UserLinks = () => (
  <Flex gap={8} align="center">
    {links.map((link) => (
      <NavbarLink
        key={link.title}
        title={link.title}
        hideOnMobile={link.hideOnMobile}
      >
        {link.icon}
      </NavbarLink>
    ))}
  </Flex>
);

export default UserLinks;
