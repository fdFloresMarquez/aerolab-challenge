// 1. Import the extendTheme function
import { extendTheme, theme } from '@chakra-ui/react';

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  primary: theme.colors.orange,
};

export const aeroLabtheme = extendTheme({ colors });
