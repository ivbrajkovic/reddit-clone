import Directory from "@/components/Navbar/Directory/Directory";
import Logo from "@/components/Navbar/Logo";
import RightContent from "@/components/Navbar/RightContent/RightContent";
import SearchInput from "@/components/Navbar/SearchInput";
import { AuthModal } from "@/features/auth";
import CreateCommunityModal from "@/features/communities/compponents/CreateCommunityModal/CreateCommunityModal";
import { createStyles, Header } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    gap: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.white,
  },
}));

export const Navbar = () => {
  const { classes } = useStyles();
  return (
    <Header height={48} className={classes.header}>
      <AuthModal />
      <CreateCommunityModal />
      <Logo />
      <Directory />
      <SearchInput />
      <RightContent />
    </Header>
  );
};
