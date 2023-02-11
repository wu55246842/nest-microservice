import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ServiceBModule } from './service-b.module';

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ServiceBModule, {
    transport: Transport.TCP,
    options: {
      host: "0.0.0.0",
      port: 9802
    }
  });
  app.listen();
  logger.log("Microservice B is listening")
}
bootstrap();
