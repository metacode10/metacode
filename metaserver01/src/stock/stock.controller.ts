import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('stock')
export class StockController {
  @Get()
  @ApiOperation({ summary: '모든 사용자 가져오기' }) // API 설명 추가
  @ApiResponse({ status: 200, description: '성공' })
  @ApiResponse({ status: 403, description: '권한 없음' })
  getAllUsers() {
    return [{ id: 1, name: 'John Doe' }];
  }
}
