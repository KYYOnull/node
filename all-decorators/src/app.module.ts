import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AaaController } from './aaa.controller';

@Global()
@Module({
  imports: [],
  controllers: [AppController, AaaController],
  providers: [ // ioc
    AppService,
    {
      provide: 'Kyyo',
      useFactory(){ // bean factory
        return{
          name: 'kyyo'
        }
      }
    },
  ],
})
export class AppModule {}
