import { Avatar, Box, Divider, Image, Stack, Text } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';

import { Filter } from './types';
import { Count } from './Count';
import { Filters } from './Filters';
import { ProductGrid } from './ProductGrid';

import { Product } from '@/product/types';
import { useProductList } from '@/product/hooks';

interface Props {
  products: Product[];
}

export const ProductsList: React.FC<Props> = ({ products }) => {
  const [filter, setFilter] = useState<Filter>(Filter.MostRecent);
  const filteredProducts = useMemo(() => {
    switch (filter) {
      case Filter.HighestPrice: {
        return [...products].sort((a, b) => b.cost - a.cost);
      }
      case Filter.LowestPrice: {
        return [...products].sort((a, b) => a.cost - b.cost);
      }
      case Filter.MostRecent:
      default: {
        return [...products].reverse();
      }
    }
  }, [filter, products]);

  const { from, to, goBack, goRight, getCurrentCount } = useProductList();

  const productsOnPage = filteredProducts.slice(from, to);

  return (
    <Stack alignItems="flex-start" spacing={6}>
      <Stack as="nav" direction="row" flex={1} justifyContent="space-between" w="100%">
        <Stack alignItems="center" direction="row" spacing={6}>
          <Count current={getCurrentCount(to, products.length)} total={products.length} />
          <Divider borderColor="gray.300" h={12} orientation="vertical" />
          <Filters active={filter} onChange={setFilter} />
        </Stack>

        <Stack direction="row" ml="auto" spacing={3}>
          <Avatar
            bg="orange.400"
            border="1px solid black"
            className="avatar"
            cursor="pointer"
            icon={<ChevronLeftIcon className="btn-icon" color="black" />}
            onClick={() => goBack()}
          />
          <Avatar
            bg="orange.400"
            border="1px solid black"
            className="avatar"
            cursor="pointer"
            icon={<ChevronRightIcon className="btn-icon" color="black" />}
            onClick={() => goRight(products.length)}
          />
        </Stack>
      </Stack>
      <ProductGrid products={productsOnPage} />
      <Count current={getCurrentCount(to, products.length)} total={products.length} />
    </Stack>
  );
};
