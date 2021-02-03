import { CURRENCY } from '../../utils/constants';
import { currencyVar } from '../reactiveVariables';

export const updateCurrency = (currency: string) => {
  if (currency === CURRENCY.LEI || currency === CURRENCY.EURO) {
    currencyVar(currency);
  }
};
