import { createStyles, Input } from "@mantine/core";
import { TbSearch } from "react-icons/tb";

const useStyles = createStyles((theme) => ({
  search: {
    flex: 1,

    input: {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[1],

      "&:hover": {
        border: "1px solid",
        borderColor: theme.colors.blue[4],
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
      },

      "&:focus": {
        outline: "none",
        border: "1px solid",
        borderColor: theme.colors.blue[4],
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
      },
    },
  },
}));

const SearchInput = () => {
  const { classes } = useStyles();
  return (
    <Input
      maw={{ base: "none", md: 960 }}
      radius="xl"
      placeholder="Search Reddit"
      className={classes.search}
      icon={<TbSearch size={16} strokeWidth={1.5} />}
    />
  );
};

export default SearchInput;
