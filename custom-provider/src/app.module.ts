import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Global } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    {
      provide: AppService,
      useClass: AppService
    },
    {
      provide: 'person',
      useValue: {
        name: 'aaa',
        age: 20
      }
    }

  ],
})
export class AppModule { }
