import { Product } from './types';

const token = import.meta.env.VITE_AEROLAB_TOKEN;

export default {
  list: async (fetchParam: string): Promise<Product[]> => {
    const requestOptions = {
      method: 'GET',
      headers: new Headers({ Authorization: token }),
    };

    return await fetch(
      `https://coding-challenge-api.aerolab.co/${fetchParam}`,
      requestOptions,
    ).then((res) => {
      if (!res.ok) {
        throw new Error(`Http error! Status: ${res.status}`);
      }

      return res.json();
    });
  },
  redeem: async (product: Product): Promise<string> => {
    const requestOptions = {
      method: 'POST',
      headers: new Headers({ Authorization: token, 'Content-Type': 'application/json' }),
      body: JSON.stringify({ productId: product._id }),
    };

    return await fetch('https://coding-challenge-api.aerolab.co/redeem', requestOptions).then(
      (res) => {
        if (!res.ok) {
          throw new Error(`Http error! Cannot redeem Product. Status: ${res.status}`);
        }

        return res.json();
      },
    );
  },
};
