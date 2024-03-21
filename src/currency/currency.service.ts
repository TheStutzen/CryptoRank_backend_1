import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CurrencyService {
  async convertCurrency(
    from: string,
    to: string = 'tether',
    amount: number = 1,
  ): Promise<{ amount: number; from: string; to: string; result: number }> {
    try {
      const prices = await this.getCurrencyPrices();

      const fromCurrency = prices.find((currency) => currency.key === from);
      const toCurrency = prices.find((currency) => currency.key === to);

      if (!fromCurrency || !toCurrency) {
        throw new Error(`Price for currency ${from} or ${to} not found`);
      }

      const result = this.calculateConversion(
        fromCurrency.price,
        toCurrency.price,
        amount,
      );

      return { amount, from, to, result };
    } catch (error) {
      throw new Error(`Failed to convert currency: ${error.message}`);
    }
  }

  private async getCurrencyPrices(): Promise<
    { key: string; price: number; volume: number }[]
  > {
    try {
      const response = await axios.get(
        'https://tstapi.cryptorank.io/v0/coins/prices/',
      );

      const currenciesData = response.data.data;
      const currencies: { key: string; price: number; volume: number }[] = [];

      for (const currency of currenciesData) {
        const { key, price, volume } = currency;
        currencies.push({ key, price, volume });
      }

      if (!Array.isArray(currencies) || currencies.length === 0) {
        throw new Error('Currencies data is not an array or is empty');
      }

      return currencies;
    } catch (error) {
      throw new Error(`Failed to fetch currency prices: ${error.message}`);
    }
  }

  private calculateConversion(
    fromPrice: number,
    toPrice: number,
    amount: number,
  ): number {
    const result = (amount * toPrice) / fromPrice;
    return this.roundToTwoDecimalPlaces(result);
  }

  private roundToTwoDecimalPlaces(num: number): number {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  }
}
