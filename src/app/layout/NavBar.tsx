import React from 'react';
import {
  Box,
  Container,
  Image,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

import { CoinButton } from './CoinButton';

import { usePoints, useUser } from '@/user/hooks';
import logo from '@/assets/logo.svg';
import coin from '@/assets/icons/coin.svg';

export const NavBar: React.FC = () => {
  const { pathname } = useLocation();

  const [points, addPoints] = usePoints();
  const user = useUser();

  return (
    <Box backgroundColor="white" boxShadow="md">
      <Container maxWidth="9xl">
        <Stack
          alignItems="center"
          as="nav"
          direction="row"
          justifyContent="space-between"
          paddingY={3}
        >
          <Link href="/">
            <Image height={8} src={logo} width={8} />
          </Link>

          <Popover trigger="hover">
            <PopoverTrigger>
              <Stack alignItems="center" color="gray.500" direction="row" spacing={3}>
                <Text>{user.name}</Text>
                <Stack
                  alignItems="center"
                  backgroundColor="gray.100"
                  borderRadius={9999}
                  cursor="pointer"
                  direction="row"
                  paddingX={3}
                  paddingY={2}
                  onClick={() => addPoints(1000)}
                >
                  <Text fontWeight="500" userSelect="none">
                    {points}
                  </Text>
                  <Image height={6} src={coin} width={6} />
                </Stack>
              </Stack>
            </PopoverTrigger>

            <Portal>
              <PopoverContent>
                <PopoverArrow />
                <PopoverHeader textAlign="center">Add points</PopoverHeader>
                <PopoverBody>
                  <Stack direction="row">
                    <CoinButton points={1000} />
                    <CoinButton points={5000} />
                    <CoinButton points={7500} />
                  </Stack>
                </PopoverBody>
                <Link href={pathname === '/history' ? '/' : '/history'}>
                  <PopoverFooter textAlign="center">
                    {pathname === '/history' ? 'Go back' : 'History'}
                  </PopoverFooter>
                </Link>
              </PopoverContent>
            </Portal>
          </Popover>
        </Stack>
      </Container>
    </Box>
  );
};
