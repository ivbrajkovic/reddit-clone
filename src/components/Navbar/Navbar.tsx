import Directory from "@/components/Navbar/Directory/Directory";
import Logo from "@/components/Navbar/Logo";
import RightContent from "@/components/Navbar/RightContent/RightContent";
import SearchInput from "@/components/Navbar/SearchInput";
import { HEADER_HEIGHT } from "@/constants";
import CreateCommunityModal from "@/features/communities/components/CreateCommunityModal/CreateCommunityModal";
import { createStyles, Group, Header } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  header: {
    position: "fixed",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.white,
  },
}));

export const Navbar = () => {
  const { classes } = useStyles();
  return (
    <Header height={HEADER_HEIGHT} className={classes.header}>
      <Group spacing={8}>
        <CreateCommunityModal />
        <Logo />
        <Directory />
        <SearchInput />
        <RightContent />
      </Group>
    </Header>
  );
};
