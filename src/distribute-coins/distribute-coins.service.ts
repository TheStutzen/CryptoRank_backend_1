import { Injectable } from '@nestjs/common';

@Injectable()
export class DistributeCoinsService {
  distributeCoins(
    coinsAvailable: { [key: string]: number },
    requests: string[],
  ): string[] | null {
    const results: string[] = [];

    for (const request of requests) {
      const [coin1, coin2] = request.split('/');
      const availableCoin1 = coinsAvailable[coin1] || 0;
      const availableCoin2 = coinsAvailable[coin2] || 0;

      if (coin2 && (availableCoin1 || availableCoin2)) {
        if (availableCoin1 > availableCoin2) {
          results.push(coin1);
          coinsAvailable[coin1]--;
        } else {
          results.push(coin2);
          coinsAvailable[coin2]--;
        }
      } else if (availableCoin1) {
        results.push(coin1);
        coinsAvailable[coin1]--;
      } else if (availableCoin2) {
        results.push(coin2);
        coinsAvailable[coin2]--;
      } else {
        return null;
      }
    }

    return results;
  }
}
