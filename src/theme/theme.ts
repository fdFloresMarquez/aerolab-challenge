// 1. Import the extendTheme function
import { extendTheme } from '@chakra-ui/react';

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  primary: {
    900: '#1a365d',
    800: '#EA044E',
    700: '#2a69ac',
  },
  background: {
    800: '#F9F6F4',
  },
};

export const theme = extendTheme({ colors });
