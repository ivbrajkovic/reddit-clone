import { createStyles, Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import React from "react";

const useStyles = createStyles((theme) => ({
  search: {
    flex: 1,

    input: {
      backgroundColor: theme.colors.gray[1],

      "&:hover": {
        backgroundColor: theme.colors.gray[0],
        border: "1px solid",
        borderColor: theme.colors.blue[4],
      },

      "&:focus": {
        outline: "none",
        border: "1px solid",
        borderColor: theme.colors.blue[4],
      },
    },
  },
}));

type SearchInputProps = {
  // user: User
};

const SearchInput: React.FC<SearchInputProps> = () => {
  const { classes } = useStyles();
  return (
    <Input
      placeholder="Search Reddit"
      className={classes.search}
      icon={<IconSearch size={16} stroke={1.5} />}
    />
  );
};

export default SearchInput;
