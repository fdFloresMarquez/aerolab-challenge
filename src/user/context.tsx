import React, { useEffect, useState } from 'react';
import { Center, CircularProgress } from '@chakra-ui/react';

import { User } from './types';
import api from './api';

import productApi from '@/product/api';
import { Product } from '@/product/types';

export interface Context {
  state: {
    user: User;
    redeemStatus: 'pending' | 'resolved' | 'rejected';
  };
  actions: {
    addPoints: (amount: number) => Promise<void>;
    redeem: (product: Product) => Promise<void>;
  };
}

interface ProviderProps {
  children: React.ReactNode;
}

const UserContext = React.createContext({} as Context);

const UserProvider: React.FC<ProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>();
  const [status, setStatus] = useState<'pending' | 'resolved' | 'rejected'>('pending');
  const [redeemStatus, setRedeemStatus] = useState<'pending' | 'resolved' | 'rejected'>('rejected');

  const handleRedeem = async (product: Product) => {
    if (!user) return;
    setRedeemStatus('pending');

    try {
      return await productApi.redeem(product).then(() => {
        setUser({ ...user, points: user.points - product.cost });
        setRedeemStatus('resolved');
      });
    } catch (error) {
      setRedeemStatus('rejected');

      throw new Error(`Cannot reddeem product ${error}`);
    }
  };

  const handleAddPoints = async (amount: number) => {
    if (!user) return;

    return api.points.add(amount).then(() => {
      setUser({ ...user, points: user.points + amount });
    });
  };

  useEffect(() => {
    api
      .fetch()
      .then((user) => {
        setUser(user);
        setStatus('resolved');
      })
      .catch((error) => {
        setStatus('rejected');
        throw error;
      });
  }, []);

  if (!user || status === 'pending') {
    return (
      <Center padding={12}>
        <CircularProgress isIndeterminate color="primary.400" />
      </Center>
    );
  }

  const state: Context['state'] = {
    user,
    redeemStatus,
  };
  const actions = {
    addPoints: handleAddPoints,
    redeem: handleRedeem,
  };

  return <UserContext.Provider value={{ state, actions }}>{children}</UserContext.Provider>;
};

export { UserContext as default, UserProvider as Provider };
