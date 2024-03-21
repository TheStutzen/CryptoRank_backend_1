import { Module } from '@nestjs/common';
import { DistributeCoinsService } from './distribute-coins.service';
import { DistributeCoinsController } from './distribute-coins.controller';

@Module({
  controllers: [DistributeCoinsController],
  providers: [DistributeCoinsService],
})
export class DistributeCoinsModule {}
