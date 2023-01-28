import { MantineThemeOverride } from "@mantine/core";

type MantineButton = NonNullable<MantineThemeOverride["components"]>["Button"];

export const mantineButton: MantineButton = {
  defaultProps: {
    size: "md",
  },
  styles: (theme, params) => ({
    root: {
      ...theme.fn.fontStyles(),
      borderRadius: theme.radius.xl,
      fontSize: "10pt",
      fontWeight: 700,
      "&:focus": { boxShadow: "none" },

      // size
      ...(params.size === "sm" ? { fontSize: "8pt" } : {}),

      // variant
      ...(params.variant === "filled"
        ? {
            color: theme.colors.gray[0],
            backgroundColor: theme.colors.blue[5],
            ["&:hover"]: { backgroundColor: theme.colors.blue[4] },
          }
        : params.variant === "outline"
        ? {
            color: theme.colors.blue[4],
            border: `1px solid ${theme.colors.blue[4]}`,
          }
        : params.variant === "oauth"
        ? {
            height: "34px",
            color: theme.black,
            backgroundColor: theme.white,
            border: `1px solid ${theme.colors.gray[4]}`,

            ["&:hover"]: { backgroundColor: theme.colors.gray[1] },
          }
        : {}),
    },
  }),
};
