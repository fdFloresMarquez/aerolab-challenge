import React from 'react';
import { Image, Stack, Text } from '@chakra-ui/react';

import coin from '@/assets/icons/coin.svg';
import { usePoints } from '@/user/hooks';

interface Props {
  points: number;
}

export const CoinButton: React.FC<Props> = ({ points }) => {
  const [userPoints, addPoints] = usePoints();

  return (
    <Stack
      alignItems="center"
      backgroundColor="gray.100"
      borderRadius={9999}
      cursor="pointer"
      direction="row"
      paddingX={3}
      paddingY={2}
      onClick={() => addPoints(points)}
    >
      <Text fontWeight="500" userSelect="none">
        {points}
      </Text>
      <Image height={6} src={coin} width={6} />
    </Stack>
  );
};
