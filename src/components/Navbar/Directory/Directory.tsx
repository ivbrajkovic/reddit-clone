import { FadeInImage } from "@/components/FadeInImage";
import UserMenuTarget from "@/components/Navbar/UserMenu/UserMenuTarget";
import { useSignedInUser } from "@/features/auth/hooks/useSignedInUser";
import { selectCommunitySnippets } from "@/features/communities/communitySlice";
import { useCommunityCreateModal } from "@/features/communities/hooks/useCommunityCreateModal";
import { Box, createStyles, CSSObject, Flex, Menu, Text } from "@mantine/core";
import Link from "next/link";
import { TiHome } from "react-icons/ti";
import { VscAdd } from "react-icons/vsc";
import { useSelector } from "react-redux";

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
  const { openCommunityCreateModal } = useCommunityCreateModal();

  const communitySnippets = useSelector(selectCommunitySnippets);

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
        <Menu.Label>My Communities</Menu.Label>
        <Menu.Item
          icon={<VscAdd fontSize={20} />}
          onClick={openCommunityCreateModal}
        >
          Create Community
        </Menu.Item>
        {communitySnippets.map((community) => (
          <Menu.Item
            component={Link}
            key={community.communityId}
            icon={
              community.imageUrl ? (
                <FadeInImage
                  src={community.imageUrl}
                  alt="Community logo"
                  radius="xl"
                  height={20}
                  width={20}
                />
              ) : (
                <TiHome fontSize={20} />
              )
            }
            href={`/r/${community.communityId}`}
          >
            {`/r/${community.communityId}`}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};
export default Directory;
