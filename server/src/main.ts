import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from './pipes/validation.pipe';
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';
import * as fs from 'fs';
import * as path from 'path';

const bootstrap = async () => {
  const PORT = process.env.PORT || 7777;
  console.log(path.join(__dirname, 'secrets', 'key.pem'));
  const httpsOptions: HttpsOptions = {
    key: fs.readFileSync(path.join(__dirname, 'secrets', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'secrets', 'cert.pem')),
  };
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT'],
  });
  app.use(helmet());
  //app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

bootstrap();
