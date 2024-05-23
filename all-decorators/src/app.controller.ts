import { Controller, Get, Inject, Optional, SetMetadata, UseGuards,Headers, Ip } from '@nestjs/common';
import { AppService } from './app.service';
import { AaaGuard } from './aaa.guard';

@Controller()
@SetMetadata('roles', ['user'])
export class AppController {

  // 变为可选 即找不到bean也通过
  // constructor(private readonly appService: AppService) {}
  constructor(@Optional() private readonly appService: AppService) {}

  @Inject('Kyyo')
  private kyyo: Record<string,string>

  @SetMetadata('roles', ['admin'])
  @UseGuards(AaaGuard)
  @Get()
  getHello(): string {
    console.log(this.kyyo); // { name: 'kyyo' }
    return this.appService.getHello();
  }

  @Get('/ccc')
  getHeader(@Headers('Accept') acc:string, @Headers() headers:Record<string,any>, @Ip() ip:string){
    console.log('acc: ', acc);
    console.log('headers: ', headers)
    console.log('ip: ', ip)
  }
}

// acc:  text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
// headers:  {
//   host: 'localhost:3000',
//   connection: 'keep-alive',
//   'cache-control': 'max-age=0',
//   'sec-ch-ua': '"Microsoft Edge";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
//   'sec-ch-ua-mobile': '?0',
//   'sec-ch-ua-platform': '"Windows"',
//   'upgrade-insecure-requests': '1',
//   'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 Edg/125.0.0.0',
//   accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
//   'sec-fetch-site': 'none',
//   'sec-fetch-mode': 'navigate',
//   'sec-fetch-user': '?1',
//   'sec-fetch-dest': 'document',
//   'accept-encoding': 'gzip, deflate, br, zstd',
//   'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,ja;q=0.7',
//   cookie: 'Hm_lvt_1d2d61263f13e4b288c8da19ad3ff56d=1693384570; Hm_lpvt_1d2d61263f13e4b288c8da19ad3ff56d=1693384570; userId=1683025552364568576; token=Bearer%20eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MDk1NzE3NzAsImlzcyI6ImluZGV4MTIzMDYiLCJzdWIiOiJ7XCJyZWFsTmFtZVwiOlwi5b6Q5LiH6YeMXCIsXCJ1c2VySWRcIjpcIjE2ODMwMjU1NTIzNjQ1Njg1NzZcIixcInVzZXJuYW1lXCI6XCJhZG1pblwifSIsImV4cCI6MTcwOTY1ODE3MH0.vReXprD9buq8tkcdxBm6vZJ-C-u-LsikCJddpVV3tisY52tVPotjub1X8JrJAGcGbmJZWEGYiShD9bQxJ9LPXQ; Admin-Token=eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjE1ZmUxZTdlLWYzYjQtNDAyNy1iNmE4LWVhNGViODBhYTQ5MyJ9.80RKHxQYY0r2FqhWFDHSIZ3SPCk7nFGID0n0XY8fuH0sIG4m6axeUhiWTws60geaxRW7LHR6X9IfZfuvtiwMuQ; sidebarStatus=0; connect.sid=s%3AcP4SR34LiRy2OamLY5VbONgcaUMxi1W-.DDuwbPty%2BiIjjJ7bykKA83%2FNyVeR0Ce9wyBvx73o%2FtY'
// }