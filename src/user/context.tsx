import React, { useEffect, useState } from 'react';
import { Center, CircularProgress } from '@chakra-ui/react';

import { User } from './types';
import api from './api';

export interface Context {
  state: {
    user: User;
  };
  actions: {
    addPoints: (amount: number) => Promise<void>;
  };
}

interface ProviderProps {
  children: React.ReactNode;
}

const UserContext = React.createContext({} as Context);

const UserProvider: React.FC<ProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>();
  const [status, setStatus] = useState<'pending' | 'resolved' | 'rejected'>('pending');

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
  };

  return <UserContext.Provider value={{ state, actions }}>{children}</UserContext.Provider>;
};

export { UserContext as default, UserProvider as Provider };
