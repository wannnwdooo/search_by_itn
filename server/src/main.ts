import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

(async () => {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = app.get(ConfigService);
  const port = config.get('API_PORT');
  app.setGlobalPrefix('api');
  app.enableCors();
  await app.listen(port, () => console.log(`App started on port: ${port}`));
})();
