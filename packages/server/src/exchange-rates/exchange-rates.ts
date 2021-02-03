// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios').default;

export async function getCurrencyRates() {
  const eurBased = await axios
    .get('https://api.exchangeratesapi.io/latest')
    .then((response) => response.data)
    .catch((error) => error);

  const ronBased = await axios
    .get('https://api.exchangeratesapi.io/latest?base=RON')
    .then((response) => response.data)
    .catch((error) => error);

  return { eurBased, ronBased };
}
