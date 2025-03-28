import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';

@Module({
  providers: [StockService],
  controllers: [StockController],
})
// eslint-disable-next-line prettier/prettier
export class StockModule { }
