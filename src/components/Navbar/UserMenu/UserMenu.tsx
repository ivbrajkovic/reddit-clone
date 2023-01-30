import UserMenuTarget from "@/components/Navbar/UserMenu/UserMenuTarget";
import { useAuthModal } from "@/features/auth/hooks/useAuthModal";
import { useSignedInUser } from "@/hooks/useIsUserSignedIn";
import { useSignOut } from "@/hooks/useSignOut";
import {
  Box,
  createStyles,
  CSSObject,
  Flex,
  Menu,
  Switch,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { User } from "firebase/auth";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { IoSparkles } from "react-icons/io5";
import { MdOutlineDarkMode, MdOutlineLogin } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";

const useStyles = createStyles((theme) => ({
  item: {
    color: theme.colorScheme === "dark" ? "inherit" : theme.colors.gray[7],
  },
  itemIcon: {
    width: 20,
    fontSize: 20,
  },
  itemLabel: {
    "&:disabled": {
      color: theme.colors.gray[6],
    },
  },

  userIcon: {
    borderRadius: 4,
    backgroundColor: theme.colorScheme === "dark" ? "#818384" : "#d7dfe2",
  },
  userInfo: {
    width: 124,
    marginInline: 4,
    display: "none",
    flexDirection: "column",
    fontSize: "9pt",
    [`@media (min-width: ${theme.breakpoints.lg}px)`]: {
      display: "flex",
    },
  },

  switch: {
    pointerEvents: "none",
  },
}));

const LoggedInUserMenuItems = () => {
  const { classes } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  const toggleDarkMode = () => toggleColorScheme();
  return (
    <>
      <Menu.Item disabled icon={<CgProfile />} className={classes.itemLabel}>
        My Stuff
      </Menu.Item>
      <Menu.Item icon=" ">Profile</Menu.Item>
      <Menu.Item icon=" ">User Settings</Menu.Item>
      <Menu.Divider />
      <Menu.Item
        disabled
        icon={<MdOutlineDarkMode />}
        className={classes.itemLabel}
      >
        View Options
      </Menu.Item>
      <Menu.Item
        icon=" "
        closeMenuOnClick={false}
        rightSection={
          <Switch size="sm" checked={isDark} className={classes.switch} />
        }
        onClick={toggleDarkMode}
      >
        Dark Mode
      </Menu.Item>
      <Menu.Divider />
    </>
  );
};

const LoginMenuItem = () => (
  <Menu.Item icon={<MdOutlineLogin />} onClick={useAuthModal().openLogin}>
    Log In / Sign Up
  </Menu.Item>
);

const LogoutMenuItem = () => (
  <Menu.Item icon={<MdOutlineLogin />} onClick={useSignOut()}>
    Log Out
  </Menu.Item>
);

const formatDisplayName = (user: User) =>
  user.displayName ?? user.email?.split("@")[0];

const UserMenuButton = ({ user }: { user: User }) => {
  const { classes } = useStyles();
  return (
    <>
      <Image
        src="/images/reddit-user.svg"
        alt="reddit user"
        width={24}
        height={24}
        className={classes.userIcon}
      />
      <Box className={classes.userInfo}>
        <Text fw={700}>{formatDisplayName(user)}</Text>
        <Flex align="center">
          <IoSparkles fontSize={12} color="red" />
          <Text color="gray.5">1 karma</Text>s
        </Flex>
      </Box>
    </>
  );
};

const UserMenuTargetButton = ({ user }: { user?: User | null }) =>
  !user ? <VscAccount fontSize={20} /> : <UserMenuButton user={user} />;

const UserMenu = () => {
  const { classes } = useStyles();
  const signedInUser = useSignedInUser();
  return (
    <Menu
      shadow="md"
      width={200}
      styles={{
        item: classes.item as unknown as CSSObject,
        itemIcon: classes.itemIcon as unknown as CSSObject,
      }}
    >
      <UserMenuTarget>
        <UserMenuTargetButton user={signedInUser} />
      </UserMenuTarget>
      <Menu.Dropdown>
        {signedInUser ? <LoggedInUserMenuItems /> : null}
        {signedInUser ? <LogoutMenuItem /> : <LoginMenuItem />}
      </Menu.Dropdown>
    </Menu>
  );
};
export default UserMenu;
