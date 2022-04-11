import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from './pipes/validation.pipe';
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';
import * as fs from 'fs';
import * as path from 'path';
import * as selfsigned from 'selfsigned';
import * as cookieParser from 'cookie-parser';

const bootstrap = async () => {
  const PORT = process.env.PORT || 7777;
  const attributes = { name: 'commonCertificate', value: 'localhost' };
  const sslMock = selfsigned.generate(attributes, { days: 365 });
  let sslKey, sslCertificate;

  try {
    sslKey = fs.readFileSync(path.join(__dirname, 'secrets', 'key.pem'));
    sslCertificate = fs.readFileSync(
      path.join(__dirname, 'secrets', 'cert.pem'),
    );
  } catch {
    sslKey = sslMock.private;
    sslCertificate = sslMock.cert;
  }

  const httpsOptions: HttpsOptions = {
    key: sslKey,
    cert: sslCertificate,
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['https://localhost:3000', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT'],
  });
  app.use(cookieParser());
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

bootstrap();
