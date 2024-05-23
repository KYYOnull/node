import { Controller, Get, HostParam, Next, Redirect, Req, Res } from '@nestjs/common';
import { NextFunction, Request,Response } from 'express';

// @Controller('aaa') // host 满足 xx.0.0.1 的时候才会路由到这个 controller
@Controller(
    { 
        // host: ':host.0.0.1',
        path: 'aaa' 
    }
)
export class AaaController {

    @Get('bbb')
    hello(@HostParam('host') host:string, @Req() req:Request, 
        // @Res({passthrough:true}) res:Response, 
        @Next() nxt:NextFunction) {
        console.log(host); // 127

        console.log(req.hostname);
        console.log(req.url);
        console.log(req.params);
        // 127.0.0.1
        // /aaa/bbb
        // {}

        nxt(); // 转发到handler2


        // 自定义响应
        // 使用response 这时候 Nest 就不把 handler 返回值作为响应内容了
        // res.end('resres'); // 避免你自己返回的响应和 Nest 返回的响应的冲突

        return 'hhhhhh'; // 加了passthrough才能执行到这个
        // Error: Cannot remove headers after they are sent to the client
        // 在向客户端发送响应后，尝试设置响应头部（headers）导致了错误 多次调用响应发送方法
    }

    @Get('bbb')
    // @Redirect('http://juejin.cn')
    hello2(){ // 不会处理注入 @Next 的 handler 的返回值
        console.log('the next handler');
        return 'bbbbbb'
        // return {
        //     url: 'https://www.baidu.com',
        //     statusCode: 302
        // } // 无效
        // Error: Cannot set headers after they are sent to the client
        // 但是不能加 passthrough 
    }
}
