import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ServiceAModule } from './service-a.module';
import { Logger } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ServiceAModule, {
    transport: Transport.TCP,
    options: {
      host:'0.0.0.0',
      port: 9801
    }
  });

  const config = app.get(ConfigService)
  console.log('--------------->',config)
  
  app.listen();
  logger.log("Microservice A is listening")
}
bootstrap();
