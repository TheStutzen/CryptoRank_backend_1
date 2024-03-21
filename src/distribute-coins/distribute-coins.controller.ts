import { Controller, Post, Body } from '@nestjs/common';
import { DistributeCoinsService } from './distribute-coins.service';
import { ApiDistributeCoins } from 'src/utils/swagger/swagger.api';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ApiDistributeCoins')
@Controller('distribute-coins')
export class DistributeCoinsController {
  constructor(
    private readonly distributeCoinsService: DistributeCoinsService,
  ) {}

  @Post()
  @ApiDistributeCoins()
  async distributeCoins(
    @Body()
    requestBody: {
      coinsAvailable: { [key: string]: number };
      requests: string[];
    },
  ) {
    const { coinsAvailable, requests } = requestBody;
    const result = this.distributeCoinsService.distributeCoins(
      coinsAvailable,
      requests,
    );
    return result;
  }
}
