import React from 'react';
import { Center, Container, Flex } from '@chakra-ui/react';

import { NavBar } from './NavBar';

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Flex backgroundColor="gray.100" direction="column" flex={1}>
      <NavBar />
      <Center paddingY={6}>
        <Container maxWidth="9xl">{children}</Container>
      </Center>
    </Flex>
  );
};
