import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StockService } from './stock.service';

@Controller('stock')
export class StockController {
  constructor(
    private readonly stockService: StockService, // 주석 처리된 부분
  ) {}

  @Get()
  @ApiOperation({ summary: '모든 사용자 가져오기' }) // API 설명 추가
  @ApiResponse({ status: 200, description: '성공' })
  @ApiResponse({ status: 403, description: '권한 없음' })
  getAllUsers() {
    return [{ id: 1, name: 'John Doe' }];
  }

  @Get('all')
  getAllStockData() {
    return this.stockService.getAllStockData(); // 주석 처리된 부분
  }
}
