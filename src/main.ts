import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma';
import { AppModule } from './app.module';
import type {
  CorsConfig,
  NestConfig,
  SwaggerConfig,
} from 'src/common/configs/config.interface';
import { getBotToken } from 'nestjs-telegraf';
import { LoggerFactory } from './common/logger.factory';

import * as Sentry from '@sentry/node';
import { SentryFilter } from './common/sentry.filter';

import { createAgent } from '@forestadmin/agent';
import { createSqlDataSource } from '@forestadmin/datasource-sql';

import { Module } from '@nestjs/common';

async function bootstrap() {

  const agent = createAgent({
    authSecret: process.env.FOREST_AUTH_SECRET,
    envSecret: process.env.FOREST_ENV_SECRET,
    isProduction: process.env.NODE_ENV === 'production',
    typingsPath: './typings.ts',
    typingsMaxDepth: 5,

  })
  // Create your SQL datasource
  .addDataSource(createSqlDataSource(process.env.DATABASE_URL));

  const app = await NestFactory.create(AppModule, {
    logger: LoggerFactory('thaibot'),
  });
  const bot = app.get(getBotToken());

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [new Sentry.Integrations.Http({ tracing: true })],
    tracesSampleRate: 1.0,
  });

  // Validation
  app.useGlobalPipes(new ValidationPipe());

  // // enable shutdown hook
  // const prismaService: PrismaService = app.get(PrismaService);
  // await prismaService.enableShutdownHooks(app);

  // Prisma Client Exception Filter for unhandled exceptions
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  app.useGlobalFilters(new SentryFilter(httpAdapter));
  app.use(bot.webhookCallback('/webhook'));

  const configService = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>('nest');
  const corsConfig = configService.get<CorsConfig>('cors');
  const swaggerConfig = configService.get<SwaggerConfig>('swagger');

  // Swagger Api
  if (swaggerConfig.enabled) {
    const options = new DocumentBuilder()
      .setTitle(swaggerConfig.title || 'Nestjs')
      .setDescription(swaggerConfig.description || 'The nestjs API description')
      .setVersion(swaggerConfig.version || '1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup(swaggerConfig.path || 'api', app, document);
  }

  // Cors
  if (corsConfig.enabled) {
    app.enableCors();
  }

  await agent.mountOnNestJs(app).start();

  await app.listen(process.env.PORT || nestConfig.port || 3000);
}
bootstrap();
