import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AaaGuard implements CanActivate {

  @Inject(Reflector)
  private readonly refl:Reflector;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const classMeta= this.refl.get('roles', context.getClass());
    const methodMeta= this.refl.get('roles', context.getHandler());

    // [ 'user' ] [ 'admin' ]
    console.log(classMeta, methodMeta);

    return true;
  }
}
