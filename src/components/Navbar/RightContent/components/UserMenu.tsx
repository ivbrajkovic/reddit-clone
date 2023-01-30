import NavbarIcon from "@/components/Navbar/RightContent/components/NavbarIcon";
import { useIsUserSignedIn } from "@/hooks/useIsUserSignedIn";
import { createStyles, Flex, Menu } from "@mantine/core";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
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
}));

const UserMenu = () => {
  const { classes } = useStyles();
  const isUserSignedIn = useIsUserSignedIn();
  return (
    <Menu
      shadow="md"
      width={200}
      styles={(theme) => ({
        item: {
          // "&:hover": {
          //   backgroundColor: theme.colorScheme === "dark" ? "#818384" : "#d7dfe2",
          // },
        },
        itemIcon: {
          width: 24,
        },
      })}
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
        <Menu.Item
          disabled
          icon={<CgProfile fontSize={20} />}
          className={classes.itemLabel}
        >
          My Stuff
        </Menu.Item>
        <Menu.Item icon=" ">Profile</Menu.Item>
        <Menu.Item icon=" ">User Settings</Menu.Item>
        <Menu.Divider />
        <Menu.Item color="gray.6" icon={<CgProfile fontSize={20} />}>
          My Stuff
        </Menu.Item>
        <Menu.Label>
          <Flex align="center">
            <Flex w={24} mx={4}>
              <CgProfile fontSize={20} />
            </Flex>
            My Stuff
          </Flex>
        </Menu.Label>
        <Menu.Item icon=" ">Profile</Menu.Item>
        <Menu.Item icon=" ">User Settings</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
export default UserMenu;
