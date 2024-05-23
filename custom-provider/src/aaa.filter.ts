import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { AaaException } from './AaaException';
import { Response } from 'express';

@Catch(AaaException) // 声明这个 filter 处理该异常
export class AaaFilter<T> implements ExceptionFilter {

  // filter 要重写 catch 处理异常
  catch(exception: AaaException, host: ArgumentsHost) {
    console.log('in filter, exception and host: ', exception, host); 

    if(host.getType() === 'http') {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();

      response
        .status(500)
        .json({
          aaa: exception.aaa,
          bbb: exception.bbb
        });
    } else if(host.getType() === 'ws') {
    } else if(host.getType() === 'rpc') {
    }
  }
}
