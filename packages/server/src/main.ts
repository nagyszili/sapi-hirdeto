import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config/config';
import { SeederService } from './seeder/seeder.service';
import { ValidationPipe } from '@nestjs/common';

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const seeder = app.get(SeederService);
  if (config.get('runSeeders')) {
    await seeder.seedMainCategories();
    await sleep(5000);
    await seeder.seedCategories();
    await sleep(5000);
    await seeder.seedAds();
    await sleep(5000);
    await seeder.seedLocations();
    await sleep(150000);
  }

  app.enableCors();

  await app.listen(config.get('server.port'));
  console.log('Server listening on: ', config.get('server.port'));
}
bootstrap();
