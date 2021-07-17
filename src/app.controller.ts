import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiResponse({ status: HttpStatus.OK, description: 'Ok!' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Record Not Found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server Error',
  })
  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
