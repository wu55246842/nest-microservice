import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ServiceAService } from './service-a.service';

@Controller("service-a")
export class ServiceAController {
  constructor(private readonly serviceAService: ServiceAService) {}

  @Get()
  @MessagePattern({ cmd: 'getHello' })
  getHello(data : any): string {
    return this.serviceAService.getHello();
  }

}
