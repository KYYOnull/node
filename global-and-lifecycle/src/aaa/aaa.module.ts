import { Global, Module } from '@nestjs/common';
import { AaaService } from './aaa.service';
import { AaaController } from './aaa.controller';
import { AaaV2Controller } from './aaa-v2.controller';

@Global() // 无需 imports
@Module({
  controllers: [AaaV2Controller,AaaController, ], // 前面的 controller 先生效
  providers: [AaaService],

  exports: [AaaService]
})
export class AaaModule {}
