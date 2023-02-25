import UserMenuTarget from "@/components/MenuTarget/MenuTarget";
import { useSignedInUser } from "@/features/auth/hooks/useSignedInUser";
import { useCommunityCreateModal } from "@/features/communities/hooks/useCommunityCreateModal";
import { CommunitySnippet } from "@/features/communities/types";
import { DirectoryHeader } from "@/features/directory/components/DirectoryHeader";
import { DirectoryItem } from "@/features/directory/components/DirectoryItem";
import { useDirectory } from "@/features/directory/hooks/useDirectory";
import { createStyles, CSSObject, Menu } from "@mantine/core";
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

const isModerator = (communitySnippet: CommunitySnippet) =>
  communitySnippet.isModerator;

const Directory = () => {
  const { classes } = useStyles();
  const user = useSignedInUser();

  const { openCommunityCreateModal } = useCommunityCreateModal();
  const {
    communitySnippets,
    isOpenDirectory,
    setIsOpenDirectory,
    selectedDirectoryItem,
  } = useDirectory();

  if (!user) return null;
  return (
    <Menu
      shadow="md"
      width={270}
      styles={{
        item: classes.item as unknown as CSSObject,
        itemIcon: classes.itemIcon as unknown as CSSObject,
      }}
      opened={isOpenDirectory}
      onChange={setIsOpenDirectory}
    >
      <UserMenuTarget>
        <DirectoryHeader {...selectedDirectoryItem} />
      </UserMenuTarget>

      <Menu.Dropdown>
        <Menu.Label>Moderating</Menu.Label>
        {communitySnippets.filter(isModerator).map((communitySnippet) => {
          return (
            <DirectoryItem
              key={communitySnippet.communityId}
              url={`/r/${communitySnippet.communityId}`}
              icon="FaReddit"
              iconColor="lightcoral"
              imageUrl={communitySnippet.imageUrl}
            />
          );
        })}

        <Menu.Label>My Communities</Menu.Label>
        <Menu.Item
          icon={<VscAdd fontSize={20} />}
          onClick={openCommunityCreateModal}
        >
          Create Community
        </Menu.Item>
        {communitySnippets.map((communitySnippet) => (
          <DirectoryItem
            key={communitySnippet.communityId}
            url={`/r/${communitySnippet.communityId}`}
            icon="FaReddit"
            iconColor="lightblue"
            imageUrl={communitySnippet.imageUrl}
          />
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};
export default Directory;
