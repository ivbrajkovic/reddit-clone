import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  tab: {
    padding: "15px 17px",
    color: theme.colors.gray[6],
    "&[data-active='true']": {
      color: theme.colors.blue[7],
    },
  },
  tabLabel: {
    fontWeight: 600,
    fontSize: 14,
  },
  tabIcon: {
    fontSize: 22,
  },
}));
