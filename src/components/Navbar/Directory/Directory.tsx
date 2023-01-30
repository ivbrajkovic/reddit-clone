import { useIsUserSignedIn } from "@/hooks/useIsUserSignedIn";
import { createStyles, CSSObject, Menu } from "@mantine/core";

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
  const isUserSignedIn = useIsUserSignedIn();

  return (
    <Menu
      shadow="md"
      width={200}
      styles={{
        item: classes.item as unknown as CSSObject,
        itemIcon: classes.itemIcon as unknown as CSSObject,
      }}
    >
      <Menu.Target>
        <div className={classes.menuButton}>
          {isUserSignedIn ? <p></p> : <p></p>}
        </div>
      </Menu.Target>
      <Menu.Dropdown style={{ padding: 0 }}>
        <Menu.Item>Menu item</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
export default Directory;
