import { PaletteColorOptions } from "@mui/material";

declare module "@mui/material/styles" {
  interface PaletteColor {
    [key: number]: string;
  }

  interface SimplePaletteColorOptions {
    [key: number]: string;
  }

  interface Palette {
    tertiary: PaletteColor;
    skyblue: PaletteColor;
    purple: PaletteColor;
  }

  interface PaletteOptions {
    tertiary?: PaletteColorOptions;
    skyblue?: PaletteColorOptions;
    purple?: PaletteColorOptions;
  }

  interface TypeBackground {
    light: string;
  }
}
