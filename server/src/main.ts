import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as session from 'express-session';
import { ValidationPipe } from './pipes/validation.pipe';

const bootstrap = async () => {
  const PORT = process.env.PORT || 7777;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  app.use(helmet());
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'secret',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 360000 },
    }),
  );
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

bootstrap();
