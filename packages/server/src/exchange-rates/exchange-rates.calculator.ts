import { ExchangeRates } from './types';
import { getCurrencyRates } from './exchange-rates.api';

export class ExchangeRatesService {
  private static eurBased: ExchangeRates;
  private static ronBased: ExchangeRates;
  private static updatedAt: Date;

  static async getRates() {
    if (this.eurBased && this.ronBased) {
      const now = new Date();
      const hours = (now.getTime() - this.updatedAt.getTime()) / 36e5;

      if (hours > 6) {
        return this.getUpdatedRates();
      }

      return {
        eurBased: this.eurBased,
        ronBased: this.ronBased,
        updatedAt: this.updatedAt,
      };
    }
    return this.getUpdatedRates();
  }

  static async getUpdatedRates() {
    const rates = await getCurrencyRates();
    this.eurBased = rates.eurBased;
    this.ronBased = rates.ronBased;
    this.updatedAt = new Date();

    return {
      eurBased: this.eurBased,
      ronBased: this.ronBased,
      updatedAt: this.updatedAt,
    };
  }
}
