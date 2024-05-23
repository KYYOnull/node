import { Inject, Injectable } from '@nestjs/common';
import { Etcd3, Watcher } from 'etcd3';

@Injectable()
export class EtcdService {

    @Inject('ETCD_CLI')
    private cli: Etcd3;

    async saveConf(key:string, val:string){
        await this.cli.put(key).value(val);
        return `save ${key} ok`;
    }
    async getConf(key:string){
        return await this.cli.get(key).string();
    }
    async delConf(key:string) :Promise<string>{
        await this.cli.delete().key(key);
        return `delete ${key} ok`
    }

    // 服务注册
    async regSvc(svcName:string, instaId:number, metadata:string){
        const key= `/services/${svcName}/${instaId}`;
        const lease= this.cli.lease(10); // 租约过期时，etcd 将自动删除相关的键值对
        await lease.put(key).value(JSON.stringify(metadata));
        lease.on('lost', async () => { // 租约过期时触发续约
            console.log('租约过期，重新注册...');
            await this.regSvc(svcName, instaId, metadata);
        });
    }

    // 服务发现
    async discvSvc(svcName:string){
        const instas:{[key: string]: string}= await this.cli.getAll().prefix(`/services/${svcName}`).strings();
        return Object.entries(instas).map(
            // [string, string][] 对于每个键值对数组 
            ([key, val])=> JSON.parse(val)
        );
    }

    // 监听服务变更
    async watchSvc(svcName:string, callback:Function){
        const watcher:Watcher= await this.cli.watch().prefix(`/services/${svcName}`).create();
        watcher.on('put', async event=>{
            console.log('新服务节点加入： ', event.key.toString());
            callback(await this.discvSvc(svcName)); // 查看当前节点
        }).on('delete', async event=>{
            console.log('服务节点删除', event.key.toString());
            callback(await this.discvSvc(svcName)); // 
        });
    }

}
