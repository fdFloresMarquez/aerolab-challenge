import React, { useEffect, useState } from 'react';
import { CircularProgress, Container, Flex, Heading, Stack } from '@chakra-ui/react';

import api from '@/product/api';
import { Product } from '@/product/types';
import header from '@/assets/header.png';
import { ProductsList } from '@/product/components/ProductsList';

interface Props {
  title: string;
  fetchParam: string;
}

export const HomeScreen: React.FC<Props> = ({ title, fetchParam }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<'pending' | 'resolved' | 'rejected'>('pending');

  useEffect(() => {
    api.list(fetchParam).then((res) => {
      setProducts(res);
      setStatus('resolved');
    });
  }, [fetchParam]);

  if (status === 'pending') {
    return (
      <Flex alignItems="center" justifyContent="center" paddingY="12">
        <CircularProgress isIndeterminate color="primary.400" />
      </Flex>
    );
  }

  return (
    <Stack flex={1} spacing={6}>
      <Flex
        alignItems="flex-end"
        backgroundImage={{ base: 'none', md: `url(${header})` }}
        backgroundSize="cover"
        borderRadius="md"
        justifyContent="flex-start"
        minHeight={{ base: 100, md: 450 }}
        padding={6}
      >
        <Heading color={{ base: 'black', md: 'white' }} fontSize="5xl">
          {title}
        </Heading>
      </Flex>
      <Container alignSelf="center" maxWidth="7xl">
        <ProductsList products={products} />
      </Container>
    </Stack>
  );
};
