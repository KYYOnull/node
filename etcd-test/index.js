import { Etcd3 } from 'etcd3';

const client = new Etcd3({
    hosts: 'http://localhost:2379',
    auth: {
        username: 'root',
        password: '123456'
    }
});

// 操作 etcd server 

(async () => {
    await client.put('/services/a').value('aaa'); // prefix 生成map keys= [ '/services/a', '/services/b' ]
    const svcA = await client.get('/services/a')
    console.log('service A:', svcA);

    const allSvcKs = await client.getAll().prefix('/services').keys();
    const allSvcDict = await client.getAll().prefix('/services')
    // { '/services/a': 'aaa', '/services/b': 'yyyy' }

    console.log('all svc ks:', allSvcKs);
    console.log('all in map: ', allSvcDict)

    // 监听key的 put 和 delete 事件
    const tar = 'config-key';
    const watcher = await client.watch().key(tar).create();
    watcher.on('put', (req) => {
        console.log('put watched', req.value.toString())
    })
    watcher.on('delete', (req) => {
        console.log('delete watched', req.value.toString())
    })

    await saveConfig(tar, 'config-value'); // put
    let confVal = await getConfig(tar); // get
    console.log('before del Config value:', confVal); // config-value

    await deleteConfig(tar); // del

    confVal = await getConfig(tar); // get
    console.log('after del Config value:', confVal); // null

    // 测试服务注册和服务发现
    const svcName = 'my_svc';
    watchService(svcName, updatedInstas => {
        console.log('服务节点有变动:', updatedInstas); // 实例数组
    });
    await registerService(svcName, 'insta_1', { host: 'localhost', port: 3000 });
    await registerService(svcName, 'insta_2', { host: 'localhost', port: 3001 });
    // 查找my_svc 服务的所有实例
    const instances = await discoverService(svcName); // 实例数组
    console.log('所有服务节点:', instances);

})();

// 保存配置 存各种数据库连接信息、环境变量等各种配置
async function saveConfig(key, value) {
    await client.put(key).value(value);
}
// 读取配置
async function getConfig(key) {
    return await client.get(key).string();
}
// 删除配置
async function deleteConfig(key) {
    await client.delete().key(key);
}

// 一个注册中心
// 服务注册  按照 /services/服务名/实例id 的格式来指定 key
async function registerService(serviceName, instanceId, metadata) {

    const key = `/services/${serviceName}/${instanceId}`;

    const lease = client.lease(10); // 租约 10s，就是过期时间，然后过期会自动删除
    await lease.put(key).value(JSON.stringify(metadata)); // put jsonVal

    lease.on('lost', async () => { // 监听 lost 事件，在过期后自动续租
        console.log('租约过期，重新注册...');
        await registerService(serviceName, instanceId, metadata); // 调用自己续租
    });
    // 不再续租的时候，就代表这个服务挂掉了
}

// 服务发现  查询 /services/服务名 下的所有实例，返回它的信息
async function discoverService(serviceName) {
    const instas = await client.getAll().prefix(`/services/${serviceName}`).strings(); // json
    console.log('instas: ', instas);
    // instas: { key:value
    //     '/services/my_svc/insta_1': '{"host":"localhost","port":3000}',
    //     '/services/my_svc/insta_2': '{"host":"localhost","port":3001}'
    // }
    return Object.entries(instas).map(([key, value]) => JSON.parse(value));
}

// 监听服务变更
async function watchService(serviceName, callback) {
    const watcher = await client.watch().prefix(`/services/${serviceName}`).create();
    watcher.on('put', async event => {
        console.log('新的服务节点添加:', event.key.toString());
        callback(await discoverService(serviceName)); // put之后通知变动 
    }).on('delete', async event => {
        console.log('服务节点删除:', event.key.toString());
        callback(await discoverService(serviceName)); // delete之后通知变动
    });
}
