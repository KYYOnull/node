import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Aaa } from "./entity/Aaa"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123456",
    database: "aaa",
    synchronize: false,
    logging: true,
    entities: ['./**/entity/*.ts'],
    migrations: ['./migration/*.ts'],
    subscribers: [],

    connectorPackage: 'mysql2', // 驱动 指定用 mysql2 包来连接
    extra: {
        authPlugins: 'sha256_password', // 切换密码的加密方式
    }
})
