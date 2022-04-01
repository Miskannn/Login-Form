import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as session from 'express-session';
import { ValidationPipe } from './pipes/validation.pipe';
import * as cookieParser from 'cookie-parser';

const bootstrap = async () => {
  const PORT = process.env.PORT || 7777;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT'],
  });
  app.use(helmet());
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

bootstrap();
