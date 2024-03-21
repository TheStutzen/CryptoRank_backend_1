import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DistributeCoinsModule } from './distribute-coins/distribute-coins.module';
import { CurrencyModule } from './currency/currency.module';

@Module({
  imports: [DistributeCoinsModule, CurrencyModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
