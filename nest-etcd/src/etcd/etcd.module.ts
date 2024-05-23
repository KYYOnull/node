import { DynamicModule, Module } from '@nestjs/common';
import { EtcdService } from './etcd.service';
import { Etcd3, IOptions } from 'etcd3';

export const ETCD_CLIENT_TOKEN = 'ETCD_CLIENT';
export const ETCD_CLIENT_OPTIONS_TOKEN = 'ETCD_CLIENT_OPTIONS';

@Module({})
export class EtcdModule {

  static forRoot(options?: IOptions): DynamicModule{

    return {
      module: EtcdModule,
      providers: [
        EtcdService,
        {
          provide: 'ETCD_CLI',
          useFactory(options: IOptions) {
            const client = new Etcd3({
                hosts: 'http://localhost:2379',
                auth: {
                    username: 'root',
                    password: '123456'
                }
            });
            return client;
          }
        }
      ],
      exports:[
        EtcdService
      ]
    }
  }
}
