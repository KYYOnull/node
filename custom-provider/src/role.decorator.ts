import { SetMetadata } from '@nestjs/common';
import { Role } from './roles';


// 往修饰的目标上 添加 roles 的 metadata
// 在 handler 上添加这个装饰器，参数为 admin
// 也就是给这个 handler 添加了 roles 为 admin 的metadata
export const Roles = (...args: Role[]) => SetMetadata('roles', args);
