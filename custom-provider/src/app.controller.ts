import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Inject } from '@nestjs/common';
import { UseFilters } from '@nestjs/common';
import { AaaFilter } from './aaa.filter';
import { AaaException } from './AaaException';
import { UseGuards } from '@nestjs/common';
import { AaaGuard } from './aaa.guard';
import { Roles } from './role.decorator';
import { Role } from './roles';
import { UseInterceptors } from '@nestjs/common';
import { AaaInterceptor } from './aaa.interceptor';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}
  @Inject('person') 
  private readonly person: {name: string, age: number}

  // @Inject('app_service') 
  // private readonly appService: AppService


  @Get() // @UseXxx Nest会扫描，创建对象加到容器里
  @UseFilters(AaaFilter) // 路由级别启用 AaaFilter
  @UseGuards(AaaGuard) // 路由级别启用 Guard
  @UseInterceptors(AaaInterceptor) 
  @Roles(Role.Admin) // Guard 可以根据这个 metadata 决定是否放行
  getHello(): string {
    console.log(this.person);
    throw new AaaException('aaa', 'bbb');
    return this.appService.getHello();
  }
}
