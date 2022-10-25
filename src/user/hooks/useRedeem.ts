import { useContext } from 'react';

import UserContext, { Context } from '../context';

export const useRedeem = (): [Context['state']['redeemStatus'], Context['actions']['redeem']] => {
  const {
    state: { redeemStatus },
    actions: { redeem },
  } = useContext(UserContext);

  return [redeemStatus, redeem];
};
