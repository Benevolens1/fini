import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  console.log('process.env.JWT_SECRET :', process.env.JWT_SECRET);
  console.log('JWT typof :', typeof(process.env.JWT_SECRET));
  await app.listen(3000);
}
bootstrap();
