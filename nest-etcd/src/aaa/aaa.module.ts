import { Module } from '@nestjs/common';
import { AaaService } from './aaa.service';
import { AaaController } from './aaa.controller';
import { EtcdModule } from 'src/etcd/etcd.module';

@Module({
  imports:[ // 模块依赖
    EtcdModule
  ],
  controllers: [AaaController],
  providers: [AaaService],
})
export class AaaModule {}
