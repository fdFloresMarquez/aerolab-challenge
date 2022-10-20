import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import { theme } from './';

interface Props {
  children: React.ReactNode;
}

export const AppTheme: React.FC<Props> = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};
