import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import { mw as requestIpMw } from 'request-ip'
import * as session from 'express-session';
import * as cors from 'cors';
import * as express from 'express'


import { AppGatewayModule } from './app-gateway.module';
import { logger } from './common/libs/log4js/logger.middleware'
import { Logger } from './common/libs/log4js/log4j.util'
import { ExceptionsFilter } from './common/libs/log4js/exceptions-filter';
import { TransformInterceptor } from './common/libs/log4js/transform.interceptor';
import { HttpExceptionsFilter } from './common/libs/log4js/http-exceptions-filter';
import { NestExpressApplication } from '@nestjs/platform-express';

const Chalk = require('chalk');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppGatewayModule);

  app.use(cors())// cross domain
  // set access frequency
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 mins
      max: 1000, // 限制15分钟内最多只能访问1000次
    }),
  )

  const config = app.get(ConfigService)
  console.log(config)

  // Set the api access prefix
  const prefix = config.get<string>('app.prefix')
  app.setGlobalPrefix(prefix)

  // web security, prevent common vulnerabilities
  app.use(helmet())

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Nest-Microservice')
    .setDescription('Nest-Microservice API Document')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, swaggerOptions)
  // 项目依赖当前文档功能，最好不要改变当前地址
  // 生产环境使用 nginx 可以将当前文档地址 屏蔽外部访问
  SwaggerModule.setup(`${prefix}/docs`, app, document, {
    swaggerOptions: {
      persistAuthorization: true
    },
    customSiteTitle: 'Nest-Microservice API Docs'
  })

  // get real ip
  app.use(requestIpMw({ attributeName: 'ip' }))

  app.enableVersioning({
    type: VersioningType.URI
  })
  app.use(session({
    secret:'wuliangtech',
    rolling:true,
    name:'wuliangtech',
    cookie:{
      maxAge:999999
    }
  }))

  // 全局验证
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      enableDebugMessages: true, // development environment
      disableErrorMessages: false
    }),
  )

  // Logger
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(logger)
  // 使用全局拦截器打印出参
  app.useGlobalInterceptors(new TransformInterceptor())
  // All Exception
  app.useGlobalFilters(new ExceptionsFilter())
  app.useGlobalFilters(new HttpExceptionsFilter())


  const port = config.get<number>('app.port') || 8080
  await app.listen(port)

  Logger.log(
    Chalk.green(`Nest-Microservice Server Start Successfully `),
    `http://localhost:${port}${prefix}/`,
    '\n',
    Chalk.green('Swagger Document Address        '),
    `http://localhost:${port}${prefix}/docs/`)

}
bootstrap();
