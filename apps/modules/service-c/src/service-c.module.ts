import { Module } from '@nestjs/common';
import { ServiceCController } from './service-c.controller';
import { ServiceCService } from './service-c.service';

@Module({
  imports: [],
  controllers: [ServiceCController],
  providers: [ServiceCService],
})
export class ServiceCModule {}
