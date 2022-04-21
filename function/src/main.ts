import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidateInputPipe } from './core/pipes/validate.pipe';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // global prefix
  app.setGlobalPrefix('api')

  // handle all user input validation globally
  app.useGlobalPipes(new ValidateInputPipe());
  await app.listen(process.env.PORT);
}
bootstrap();
