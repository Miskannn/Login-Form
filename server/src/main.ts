import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

const bootstrap = async () => {
  const PORT = process.env.PORT || 7777;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  app.use(helmet());
  await app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

bootstrap();
