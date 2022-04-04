import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from './pipes/validation.pipe';

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
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

bootstrap();
