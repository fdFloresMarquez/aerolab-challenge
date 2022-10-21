import { useContext } from 'react';

import UserContext, { Context } from '../context';

export const useRedeem = (): Context['actions']['redeem'] => {
  const {
    actions: { redeem },
  } = useContext(UserContext);

  return redeem;
};
