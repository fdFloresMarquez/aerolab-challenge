import React, { useState } from 'react';
import { Grid } from '@chakra-ui/react';

import { ProductCard } from '../ProductCard';

import { Product } from '@/product/types';

interface Props {
  products: Product[];
}

export const ProductGrid: React.FC<Props> = ({ products }) => {
  const [selected, setSelected] = useState<Product['_id'] | null>(null);

  return (
    <Grid gap={6} templateColumns="repeat(auto-fill, minmax(256px, 1fr))" w="100%">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          isSelected={selected === product._id}
          product={product}
          onClick={() => setSelected(product._id)}
        />
      ))}
    </Grid>
  );
};
