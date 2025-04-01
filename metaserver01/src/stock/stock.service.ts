import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StockData } from 'entity/stock.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(StockData)
    private readonly nonSmokingAreaRepository: Repository<StockData>,
  ) {}
  async getAllStockData(): Promise<StockData[]> {
    return this.nonSmokingAreaRepository.find();
  }
}
