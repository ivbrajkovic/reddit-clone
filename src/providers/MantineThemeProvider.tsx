import { theme } from "@/mantine/theme";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { FC, useState } from "react";

type MantineThemeProvideProps = {
  children: React.ReactNode;
};
export const MantineThemeProvider: FC<MantineThemeProvideProps> = ({
  children,
}) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ ...theme, colorScheme }}
      >
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
