import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { Logger as PinoLogger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const configService = app.get(ConfigService);
  const logger = app.get(PinoLogger);
  const httpAdapterHost = app.get(HttpAdapterHost);

  // Structured Logging
  app.useLogger(logger);

  // Security Headers (Helmet)
  app.use(helmet());

  // Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // CORS Policy
  app.enableCors({
    origin: configService.get<string>('cors.origin'),
    credentials: true,
  });

  // Centralized Exception Filter
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  const port = configService.get<number>('port') || 4000;
  await app.listen(port);
  
  new Logger('Bootstrap').log(`API running on http://localhost:${port}`);
}
bootstrap();
