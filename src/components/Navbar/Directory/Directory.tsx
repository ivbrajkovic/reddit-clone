import { FadeInImage } from "@/components/FadeInImage";
import UserMenuTarget from "@/components/Navbar/UserMenu/UserMenuTarget";
import { useSignedInUser } from "@/features/auth/hooks/useSignedInUser";
import { selectCommunitySnippets } from "@/features/communities/communitySlice";
import { useCommunityCreateModal } from "@/features/communities/hooks/useCommunityCreateModal";
import { CommunitySnippet } from "@/features/communities/types";
import { Box, createStyles, CSSObject, Flex, Menu, Text } from "@mantine/core";
import Link from "next/link";
import { FaReddit } from "react-icons/fa";
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

const isModerator = (communitySnippet: CommunitySnippet) =>
  communitySnippet.isModerator;

const Directory = () => {
  const { classes } = useStyles();
  const user = useSignedInUser();
  const communitySnippets = useSelector(selectCommunitySnippets);
  const { openCommunityCreateModal } = useCommunityCreateModal();

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
        <Menu.Label>Moderating</Menu.Label>
        {communitySnippets.filter(isModerator).map((community) => (
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
                <FaReddit fontSize={20} color="lightblue" />
              )
            }
            href={`/r/${community.communityId}`}
          >
            {`/r/${community.communityId}`}
          </Menu.Item>
        ))}

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
                <FaReddit fontSize={20} color="lightblue" />
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
