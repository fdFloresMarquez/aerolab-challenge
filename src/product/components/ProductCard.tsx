import {
  Box,
  Button,
  Center,
  CircularProgress,
  Divider,
  Flex,
  Image,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import React from 'react';

import { Product } from '../types';

import coin from '@/assets/icons/coin.svg';
import { usePoints, useRedeem } from '@/user/hooks';

interface Props {
  product: Product;
  isSelected: boolean;
  onClick: () => void;
}

export const ProductCard: React.FC<Props> = ({ product, isSelected, ...props }) => {
  const [points] = usePoints();
  const [redeemStatus, redeem] = useRedeem();
  const toast = useToast();
  const canBuy = product.cost <= points;

  const renderTextDate = (): React.ReactNode | string => {
    if (product.createDate) {
      const date = new Date(product.createDate);

      return (
        <Text color="gray.500" fontSize="xs" fontWeight="500">
          Redeemed: {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
        </Text>
      );
    } else return '';
  };

  const handleRedeem = async () => {
    if (canBuy) {
      try {
        await redeem(product);
        toast({
          title: 'Redeemed succesfuly!',
          description: `${product.name} added to your history.`,
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'bottom-left',
        });
      } catch (error) {
        toast({
          title: 'Redeemed Failed!',
          description: `Something when wrong redeeming: ${product.name}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom-left',
        });
        throw new Error(`Cannot rededem product ${error}`);
      }
    }
  };

  return (
    <Box
      {...props}
      backgroundColor="white"
      borderRadius="sm"
      boxShadow="md"
      cursor={canBuy ? 'pointer' : 'not-allowed'}
      opacity={canBuy ? 1 : 0.5}
      padding={6}
      position="relative"
    >
      <Stack spacing={3} userSelect="none">
        <Stack
          alignItems="center"
          backgroundColor="white"
          borderColor={canBuy ? 'primary.500' : 'orange.400'}
          borderRadius={999}
          borderWidth={1}
          color={canBuy ? 'primary.400' : 'orange.500'}
          direction="row"
          fontSize="sm"
          fontWeight="500"
          justifyContent="center"
          paddingX={3}
          paddingY={1}
          position="absolute"
          right={6}
          spacing={2}
          top={6}
          userSelect="none"
        >
          <Text>{canBuy ? product.cost : `Missing ${product.cost - points}`}</Text>
          <Image h={4} src={coin} w={4} />
        </Stack>
        <Center>
          <Image objectFit="contain" src={product.img.url} w={64} />
        </Center>
        <Divider />
        <Stack alignItems="flex-start" spacing={0}>
          <Text color="gray.500" fontSize="sm">
            {product.category}
          </Text>
          <Text color="gray.500" fontSize="sm" fontWeight="500">
            {product.name}
          </Text>
          {renderTextDate()}
        </Stack>
        {isSelected && (
          <Flex
            alignItems="center"
            borderRadius="sm"
            display={canBuy ? 'flex' : 'none'}
            h="100%"
            justifyContent="center"
            left={0}
            position="absolute"
            top={-3}
            w="100%"
            zIndex={2}
          >
            <Box
              backgroundColor={canBuy ? 'primary.400' : 'gray.500'}
              borderRadius="sm"
              h="100%"
              left={0}
              opacity={0.9}
              position="absolute"
              top={0}
              w="100%"
            />
            <Stack color="white" fontSize="2xl" fontWeight="bold" spacing={6} zIndex={3}>
              <Stack spacing={0}>
                <Text>{points}</Text>
                <Text borderBottomColor="white" borderBottomWidth={2}>
                  -{product.cost}
                </Text>
                <Text>{points - product.cost}</Text>
              </Stack>
              {redeemStatus === 'pending' && (
                <Center>
                  <CircularProgress isIndeterminate color="primary.400" />
                </Center>
              )}
              {canBuy && redeemStatus !== 'pending' && (
                <Button color="primary.500" onClick={handleRedeem}>
                  Redeem now
                </Button>
              )}
            </Stack>
          </Flex>
        )}
      </Stack>
    </Box>
  );
};
