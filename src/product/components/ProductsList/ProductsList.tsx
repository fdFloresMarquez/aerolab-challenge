import { Divider, Stack } from '@chakra-ui/react';
import { useMemo, useState } from 'react';

import { Filter } from './types';
import { Count } from './Count';
import { Filters } from './Filters';
import { ProductGrid } from './ProductGrid';

import { Product } from '@/product/types';

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
        return products;
      }
    }
  }, [filter, products]);

  return (
    <Stack alignItems="flex-start" spacing={6}>
      <Stack
        alignItems="center"
        as="nav"
        direction="row"
        divider={<Divider borderColor="gray.300" h={12} orientation="vertical" />}
        flex={1}
        spacing={6}
        w="100%"
      >
        <Count current={filteredProducts.length} total={products.length} />
        <Filters active={filter} onChange={setFilter} />
      </Stack>
      <ProductGrid products={filteredProducts} />
      <Count current={filteredProducts.length} total={products.length} />
    </Stack>
  );
};
