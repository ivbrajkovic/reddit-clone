import UserMenuTarget from "@/components/Navbar/UserMenu/UserMenuTarget";
import { useSignedInUser } from "@/features/auth/hooks/useSignedInUser";
import { useCommunityCreateModal } from "@/features/communities/hooks/useCommunityCreateModal";
import { Box, createStyles, CSSObject, Flex, Menu, Text } from "@mantine/core";
import { TiHome } from "react-icons/ti";
import { VscAdd } from "react-icons/vsc";

const useStyles = createStyles((theme) => ({
  item: {
    color: theme.colorScheme === "dark" ? "inherit" : theme.colors.gray[7],
  },
  itemIcon: {
    width: 20,
    fontSize: 20,
  },
}));

const Directory = () => {
  const { classes } = useStyles();
  const user = useSignedInUser();
  const { openCommunityCreateModal: openCreateCommunityModal } =
    useCommunityCreateModal();

  if (!user) return null;
  return (
    <Menu
      shadow="md"
      width={270}
      styles={{
        item: classes.item as unknown as CSSObject,
        itemIcon: classes.itemIcon as unknown as CSSObject,
      }}
    >
      <UserMenuTarget>
        <Flex gap={4} align="center">
          <TiHome fontSize={24} />
          <Box w={200} display={{ base: "none", md: "block" }}>
            <Text size="sm">Home</Text>
          </Box>
        </Flex>
      </UserMenuTarget>
      <Menu.Dropdown>
        <Menu.Item
          icon={<VscAdd fontSize={20} />}
          onClick={openCreateCommunityModal}
        >
          Create Community
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
export default Directory;
