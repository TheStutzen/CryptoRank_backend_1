import { PartialType } from '@nestjs/mapped-types';
import { CreateDistributeCoinDto } from './create-distribute-coin.dto';

export class UpdateDistributeCoinDto extends PartialType(CreateDistributeCoinDto) {}
