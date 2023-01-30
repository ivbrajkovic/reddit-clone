import { mantineButton } from "@/mantine/button";
import { MantineThemeOverride } from "@mantine/core";

export const theme: MantineThemeOverride = {
  // fontFamily: "Open Sans, sans-serif",
  // colorScheme: "light",
  colors: {
    brand: ["#FF3C00"],
  },

  globalStyles: (theme) => ({
    body: {
      ...theme.fn.fontStyles(),
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[2],
    },
  }),

  components: {
    Button: mantineButton,
  },
};
