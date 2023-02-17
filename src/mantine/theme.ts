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
          ? theme.colors.dark[8]
          : theme.colors.gray[2],
    },
  }),

  components: {
    Button: mantineButton,
    Container: {
      defaultProps: {
        sizes: {
          xs: 540,
          sm: 720,
          md: 992,
          lg: 1140,
          xl: 1320,
        },
      },
    },
  },
};
