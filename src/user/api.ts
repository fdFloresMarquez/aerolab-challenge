import { User } from './types';

const token = import.meta.env.VITE_AEROLAB_TOKEN;

export default {
  fetch: (): Promise<User> =>
    fetch('https://coding-challenge-api.aerolab.co/user/me', {
      method: 'GET',
      headers: new Headers({ Authorization: token }),
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`Http error! Status: ${res.status}`);
      }

      return res.json();
    }),
  points: {
    add: async (amount: number): Promise<number> => {
      const requestOptions = {
        method: 'POST',
        headers: new Headers({ Authorization: token, 'Content-Type': 'application/json' }),
        body: JSON.stringify({ amount }),
      };

      return await fetch(
        'https://coding-challenge-api.aerolab.co/user/points',
        requestOptions,
      ).then((res) => {
        if (!res.ok) {
          throw new Error(`Http error! Status: ${res.status}`);
        }

        return res.json();
      });
    },
  },
};
