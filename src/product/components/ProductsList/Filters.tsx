import { Box, Stack, Text } from '@chakra-ui/react';
import React from 'react';

import { Filter } from './types';

interface Props {
  active: Filter;
  onChange: (filter: Filter) => void;
}

const filters: Filter[] = [Filter.MostRecent, Filter.LowestPrice, Filter.HighestPrice];

export const Filters: React.FC<Props> = ({ active, onChange }) => {
  return (
    <Stack alignItems="center" direction="row" spacing={6}>
      <Text color="gray.500">Sort by</Text>
      <Stack direction="row" spacing={4}>
        {filters.map((filter) => (
          <Box
            key={filter}
            backgroundColor={filter === active ? 'primary.400' : 'gray.100'}
            borderRadius={999}
            color={filter === active ? 'white' : 'gray.600'}
            cursor="pointer"
            fontWeight="500"
            paddingX={6}
            paddingY={2}
            userSelect="none"
            onClick={() => onChange(filter)}
          >
            {filter}
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};
