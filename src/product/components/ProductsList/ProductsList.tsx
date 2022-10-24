import { Divider, Image, Stack } from '@chakra-ui/react';
import { useMemo, useState } from 'react';

import { Filter } from './types';
import { Count } from './Count';
import { Filters } from './Filters';
import { ProductGrid } from './ProductGrid';

import { Product } from '@/product/types';
import arrowLeft from '@/assets/icons/arrow-left.svg';
import arrowRight from '@/assets/icons/arrow-right.svg';

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

  const [qtyProducts, setQtyProducts] = useState<number>(16);

  const goBack = (): void => {
    if (qtyProducts <= 16) return;
    setQtyProducts(qtyProducts - 16);
  };

  const goRight = (): void => {
    if (qtyProducts >= products.length) return;
    setQtyProducts(qtyProducts * 2);
  };

  const productsOnPage = filteredProducts.slice(qtyProducts - 16, qtyProducts);

  return (
    <Stack alignItems="flex-start" spacing={6}>
      <Stack as="nav" direction="row" flex={1} justifyContent="space-between" w="100%">
        <Stack alignItems="center" direction="row" spacing={6}>
          <Count current={qtyProducts} total={products.length} />
          <Divider borderColor="gray.300" h={12} orientation="vertical" />
          <Filters active={filter} onChange={setFilter} />
        </Stack>

        <Stack direction="row" ml="auto" spacing={3}>
          <Image cursor="pointer" src={arrowLeft} onClick={() => goBack()} />
          <Image cursor="pointer" src={arrowRight} onClick={() => goRight()} />
        </Stack>
      </Stack>
      <ProductGrid products={productsOnPage} />
      <Count current={qtyProducts} total={products.length} />
    </Stack>
  );
};
