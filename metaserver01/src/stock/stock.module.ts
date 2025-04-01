import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockData } from 'entity/stock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StockData])],
  providers: [StockService],
  controllers: [StockController],
})
// eslint-disable-next-line prettier/prettier
export class StockModule { }
