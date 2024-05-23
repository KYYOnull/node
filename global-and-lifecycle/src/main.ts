import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.enableVersioning({
  //   type: VersioningType.HEADER,
  //   header: 'version' // req header中 要指明 version=1  用自定义 header 携带版本号
  // }); // 开启接口版本功能 通过 version 这个 header 来携带版本号
  app.enableVersioning({
    type: VersioningType.MEDIA_TYPE, // MEDIA_TYPE 是在 accept 的 header 里携带版本号
    key: 'vv='
  })
  // app.enableVersioning({ // 在 url 中放版本号挺常用
  //   type: VersioningType.URI // http://localhost:3000/v2/aaa
  // })



  await app.listen(3000);
}
bootstrap();
