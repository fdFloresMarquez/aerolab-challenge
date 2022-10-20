import { useContext } from 'react';

import UserContext, { Context } from '../context';

export const usePoints = (): [
  Context['state']['user']['points'],
  Context['actions']['addPoints'],
] => {
  const {
    state: { user },
    actions: { addPoints },
  } = useContext(UserContext);

  return [user.points, addPoints];
};
