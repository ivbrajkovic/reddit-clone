import { Box, createStyles, Menu } from "@mantine/core";
import { FC } from "react";
import { VscChevronDown } from "react-icons/vsc";

const useStyles = createStyles((theme) => ({
  menuTarget: {
    cursor: "pointer",
    paddingInline: 8,
    height: 32,
    gap: 4,
    display: "flex",
    alignItems: "center",
    borderRadius: 4,

    color: theme.colorScheme === "dark" ? "inherit" : theme.colors.gray[7],

    "&:hover": {
      outline: "1px solid",
      outlineColor: theme.colors.gray[2],
    },
  },
}));

type UserMenuTargetProps = { children: React.ReactNode };
const UserMenuTarget: FC<UserMenuTargetProps> = ({ children }) => {
  const { classes } = useStyles();

  return (
    <Menu.Target>
      <Box className={classes.menuTarget}>
        {children}
        <VscChevronDown />
      </Box>
    </Menu.Target>
  );
};
export default UserMenuTarget;
