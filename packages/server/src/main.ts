import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(config.get('server.port'));
  console.log('Server listening on: ', config.get('server.port'));
}
bootstrap();
