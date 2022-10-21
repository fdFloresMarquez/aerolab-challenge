import React, { useEffect, useState } from 'react';
import { Center, CircularProgress } from '@chakra-ui/react';

import { User } from './types';
import api from './api';

import productApi from '@/product/api';
import { Product } from '@/product/types';

export interface Context {
  state: {
    user: User;
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

  const handleRedeem = async (product: Product) => {
    if (!user) return;

    return productApi.redeem(product).then(() => {
      setUser({ ...user, points: user.points - product.cost });
    });
  };

  const handleAddPoints = async (amount: number) => {
    if (!user) return;

    return api.points.add(amount).then(() => {
      setUser({ ...user, points: user.points + amount });
    });
  };

  useEffect(() => {
    api.fetch().then((user) => {
      setUser(user);
      setStatus('resolved');
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
  };
  const actions = {
    addPoints: handleAddPoints,
    redeem: handleRedeem,
  };

  return <UserContext.Provider value={{ state, actions }}>{children}</UserContext.Provider>;
};

export { UserContext as default, UserProvider as Provider };
