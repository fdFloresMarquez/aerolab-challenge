import React from 'react';
import { Text } from '@chakra-ui/react';

interface Props {
  current: number;
  total: number;
}

export const Count: React.FC<Props> = ({ current, total }) => {
  return (
    <Text color="gray.500" fontWeight="bold">
      {current} of {total} products
    </Text>
  );
};
