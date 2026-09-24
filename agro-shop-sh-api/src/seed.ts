import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CategorySeeder } from './data/seeder/category.seeder';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seeder = app.get(CategorySeeder);
  await seeder.seed();
  await app.close();
}

bootstrap();
