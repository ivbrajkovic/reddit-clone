import NavbarIcon from "@/components/Navbar/RightContent/components/NavbarIcon";
import { useIsUserSignedIn } from "@/hooks/useIsUserSignedIn";
import { useSignOut } from "@/hooks/useSignOut";
import {
  createStyles,
  CSSObject,
  Menu,
  Switch,
  useMantineColorScheme,
} from "@mantine/core";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { MdOutlineDarkMode, MdOutlineLogin } from "react-icons/md";
import { VscAccount, VscChevronDown } from "react-icons/vsc";

const useStyles = createStyles((theme) => ({
  menuButton: {
    cursor: "pointer",
    paddingInline: 8,
    paddingBlock: 8,
    gap: 4,
    display: "flex",
    alignItems: "center",
    borderRadius: 4,

    "&:hover": {
      outline: "1px solid",
      outlineColor: theme.colors.gray[2],
    },
  },
  userIcon: {
    borderRadius: 4,
    backgroundColor: theme.colorScheme === "dark" ? "#818384" : "#d7dfe2",
  },
  itemLabel: {
    "&:disabled": {
      color: theme.colors.gray[6],
    },
  },
  switch: {
    pointerEvents: "none",
  },
  item: {
    color: theme.colorScheme === "dark" ? "inherit" : theme.colors.gray[7],
  },
  itemIcon: {
    width: 20,
    fontSize: 20,
  },
}));

const UserMenu = () => {
  const { classes } = useStyles();
  const signOutUser = useSignOut();
  const isUserSignedIn = useIsUserSignedIn();

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  const toggleDarkMode = () => toggleColorScheme();

  return (
    <Menu
      shadow="md"
      width={200}
      styles={{
        item: classes.item as unknown as CSSObject,
        itemIcon: classes.itemIcon as unknown as CSSObject,
      }}
    >
      <Menu.Target>
        <div className={classes.menuButton}>
          {isUserSignedIn ? (
            <>
              <Image
                src="/images/reddit-user.svg"
                alt="reddit user"
                width={24}
                height={24}
                className={classes.userIcon}
                style={{ fill: "red", color: "red", stroke: "red" }}
              />
              <VscChevronDown />
            </>
          ) : (
            <NavbarIcon title="account" icon={<VscAccount fontSize={20} />} />
          )}
        </div>
      </Menu.Target>
      <Menu.Dropdown style={{ padding: 0 }}>
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
        <Menu.Item icon={<MdOutlineLogin />} onClick={signOutUser}>
          User Settings
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
export default UserMenu;
