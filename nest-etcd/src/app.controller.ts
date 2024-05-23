import { Controller, Get, Inject, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Etcd3 } from 'etcd3';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject('ETCD_CLI') // 连接实例
  private etcdCli:Etcd3;

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('put') // put kyyo val
  async put(@Query('val') val:string){
    await this.etcdCli.put('kyyo').value(val);
    return 'done';
  }

  @Get('get')
  async get(){
    return (await this.etcdCli.get('kyyo').string());
  }

  @Get('del')
  async del() {
    await this.etcdCli.delete().key('kyyo');
    return 'done';
  }
}
