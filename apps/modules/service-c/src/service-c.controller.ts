import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ServiceCService } from './service-c.service';

@Controller("service-c")
export class ServiceCController {
  constructor(private readonly serviceCService: ServiceCService) {}

  @Get()
  @MessagePattern({ cmd: 'getHello' })
  getHello(): string {
    return this.serviceCService.getHello();
  }
}
