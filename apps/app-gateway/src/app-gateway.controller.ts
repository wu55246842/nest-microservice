import { Controller, Get, Header, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { FastifyRequest } from 'fastify';
import { AppGatewayService } from './app-gateway.service';

@Controller()
export class AppGatewayController {
  constructor(private readonly appGatewayService:AppGatewayService) {}

  @Get()
  @Header("content-type", "application/json")
  getHello(@Req() req: Request | FastifyRequest):  Promise<string>  {
    console.log("---------------------------")
    return this.appGatewayService.getHello();
  }

  @Get("/ping-a")
  @Header("content-type", "application/json")
  pingServiceA() {
    return this.appGatewayService.pingServiceA();
  }
}
