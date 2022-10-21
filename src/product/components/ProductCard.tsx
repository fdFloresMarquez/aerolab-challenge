import { Box, Button, Center, Divider, Flex, Image, Stack, Text } from '@chakra-ui/react';

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
  const redeem = useRedeem();
  const canBuy = product.cost <= points;

  const handleRedeem = () => {
    if (canBuy) {
      return redeem(product);
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
      <Stack spacing={3}>
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
              {canBuy && (
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
