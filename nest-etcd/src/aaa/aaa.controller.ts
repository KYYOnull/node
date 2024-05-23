import { Controller, Get, Inject, Query } from '@nestjs/common';

import { EtcdService } from 'src/etcd/etcd.service';

@Controller('aaa')
export class AaaController {

  @Inject(EtcdService)
  private etcdSvc: EtcdService;

  @Get('save')
  async saveConfig(@Query('val') value: string) {
    await this.etcdSvc.saveConf('aaa', value);
    return 'done';
  }

  @Get('get')
  async getConfig() {
    return await this.etcdSvc.getConf('aaa');
  }
}
