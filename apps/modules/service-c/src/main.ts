import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ServiceCModule } from './service-c.module';
import { Logger } from '@nestjs/common';



const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ServiceCModule, {
    transport: Transport.TCP,
    options: {
      host: "0.0.0.0",
      port: 9803
    }
  });
  app.listen();
  logger.log("Microservice B is listening")
}
bootstrap();
