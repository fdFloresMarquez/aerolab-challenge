import React, { useEffect, useState } from 'react';
import { CircularProgress, Flex, Heading, Stack } from '@chakra-ui/react';

import api from '@/product/api';
import { Product } from '@/product/types';
import header from '@/assets/header.png';
import { ProductsList } from '@/product/components/ProductsList';

export const HomeScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<'pending' | 'resolved' | 'rejected'>('pending');

  useEffect(() => {
    api.list().then((products) => {
      setProducts(products);
      setStatus('resolved');
    });
  }, []);

  if (status === 'pending') {
    return (
      <Flex alignItems="center" justifyContent="center" paddingY="12">
        <CircularProgress isIndeterminate color="primary.00" />
      </Flex>
    );
  }

  return (
    <Stack flex={1} spacing={6}>
      <Flex
        alignItems="flex-end"
        backgroundImage={`url(${header})`}
        backgroundSize="cover"
        borderRadius="md"
        justifyContent="flex-start"
        minHeight={64}
        padding={6}
      >
        <Heading color="white" fontSize="4xl">
          Electronics
        </Heading>
      </Flex>
      <ProductsList products={products} />
    </Stack>
  );
};
