import { Controller, Get, ParseFloatPipe, ParseIntPipe, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Query('aa', ParseIntPipe) aa:string): string {
    return this.appService.getHello()+ aa;
  }
  @Get('hello')
  getHello2(@Query('aa', ParseFloatPipe) aa:string){
    return typeof aa;
  }
}
