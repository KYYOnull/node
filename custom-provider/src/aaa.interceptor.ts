import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

// interceptor 集成了 RxJS，用它处理响应
// 实现接口耗时统计

@Injectable()
export class AaaInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const now= Date.now();

    return next
      .handle()
      .pipe( // 用 tap 额外执行一段逻辑
        tap(() => console.log(`After... ${Date.now() - now}ms`)),
      );
  }

}
