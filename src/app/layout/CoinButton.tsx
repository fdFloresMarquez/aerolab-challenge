import React, { useState } from 'react';
import { Center, CircularProgress, Image, Stack, Text } from '@chakra-ui/react';

import coin from '@/assets/icons/coin.svg';
import { usePoints } from '@/user/hooks';

interface Props {
  points: number;
}

export const CoinButton: React.FC<Props> = ({ points }) => {
  const [userPoints, addPoints] = usePoints();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = async (): Promise<void> => {
    setIsLoading(true);
    await addPoints(points);
    setIsLoading(false);
  };

  return (
    <Stack
      alignItems="center"
      backgroundColor="gray.100"
      borderRadius={9999}
      cursor="pointer"
      direction="row"
      paddingX={3}
      paddingY={2}
      userSelect="none"
      onClick={handleClick}
    >
      {isLoading ? (
        <Center>
          <CircularProgress isIndeterminate color="primary.400" size="30px" />
        </Center>
      ) : (
        <>
          <Text fontWeight="500">{points}</Text>
          <Image height={6} src={coin} width={6} />
        </>
      )}
    </Stack>
  );
};
