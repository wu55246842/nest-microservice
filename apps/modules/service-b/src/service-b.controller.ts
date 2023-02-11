import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ServiceBService } from './service-b.service';

@Controller("service-b")
export class ServiceBController {
  constructor(private readonly serviceBService: ServiceBService) {}

  @Get()
  @MessagePattern({ cmd: 'getHello' })
  getHello(): string {
    return this.serviceBService.getHello();
  }
}
