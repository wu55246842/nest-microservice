import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable()
export class AppGatewayService {

  constructor(
    @Inject("SERVICE-A") private readonly clientServiceA: ClientProxy,
    @Inject("SERVICE-B") private readonly clientServiceB: ClientProxy,
    @Inject("SERVICE-C") private readonly clientServiceC: ClientProxy
  ){}

  getHello():Promise<string>{
    return this.clientServiceA.send<any>({ cmd: 'getHello' },'').toPromise();
  }

  pingServiceA():string{
    return ''
  }

  // getHello(): string {
  //   const startTs = Date.now();
  //   const pattern = { cmd: "ping" };
  //   const payload = {};
  //   return this.clientServiceA
  //     .send<string>(pattern, payload)
  //     .pipe(
  //       map((message: string) => ({ message, duration: Date.now() - startTs }))
  //     );
  // }

  
}
