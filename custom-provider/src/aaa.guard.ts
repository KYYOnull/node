import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Role } from './roles';

@Injectable()
export class AaaGuard implements CanActivate {

  // 注入 reflector，但并不需在模块的 provider 声明
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    console.log(context.getType()); // http
    console.log('class: ', context.getClass()); // class:  [class AppController]
    console.log('handler: ', context.getHandler()); // handler:  [Function: getHello]

    // admin
    const requiredRoles = this.reflector.get<Role[]>('roles', context.getHandler());

    if (!requiredRoles) return true; // 拿不到限制 即无需校验直接放行

    const { user } = context.switchToHttp().getRequest();

    // some是高阶的，对数组中的每个元素依次调用回调 有一个成立即true
    return requiredRoles.some((role) => user && user.roles?.includes(role));

    // return true;
  }
}
