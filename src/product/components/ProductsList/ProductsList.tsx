import { Divider, Stack } from '@chakra-ui/react';
import { useState } from 'react';

import { Filter } from './types';
import { Count } from './Count';
import { Filters } from './Filters';

import { Product } from '@/product/types';

interface Props {
  products: Product[];
}

export const ProductsList: React.FC<Props> = ({ products }) => {
  const [filter, setFilter] = useState<Filter>(Filter.MostRecent);

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
        <Count current={products.length} total={products.length} />
        <Filters active={filter} onChange={setFilter} />
      </Stack>
      <span>Aca va la grilla</span>
      <Count current={products.length} total={products.length} />
    </Stack>
  );
};
