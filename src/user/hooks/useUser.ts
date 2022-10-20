import { useContext } from 'react';

import UserContext, { Context } from '../context';

export const useUser = (): Context['state']['user'] => {
  const {
    state: { user },
  } = useContext(UserContext);

  return user;
};
