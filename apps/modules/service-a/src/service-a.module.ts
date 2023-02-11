import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServiceAController } from './service-a.controller';
import { ServiceAService } from './service-a.service';
import configuration from './config/index'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [
        configuration
      ],
      
    }),
  ],
  controllers: [ServiceAController],
  providers: [ServiceAService],
})
export class ServiceAModule {}
