import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'node:path/posix';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 分别指定 静态资源的路径 和 模版的路径，并指定 模版引擎 为 handlerbars
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');


  await app.listen(3000);
}
bootstrap();
