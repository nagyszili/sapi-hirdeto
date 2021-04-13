import axios from 'axios';

export async function getCurrencyRates() {
  const eurBased = await axios
    .get('https://api.exchangerate.host/latest?base=EUR&symbols=RON')
    .then((response) => response.data)
    .catch((error) => error);

  const ronBased = await axios
    .get('https://api.exchangerate.host/latest?base=RON&symbols=EUR')
    .then((response) => response.data)
    .catch((error) => error);

  return { eurBased, ronBased };
}
