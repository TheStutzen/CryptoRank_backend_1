import { Controller, Get, Query } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { ApiConvertCurrency } from 'src/utils/swagger/swagger.api';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ApiConvertCurrency')
@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('convert')
  @ApiConvertCurrency()
  async convertCurrency(
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('amount') amount: number,
  ) {
    return this.currencyService.convertCurrency(from, to, amount);
  }
}
