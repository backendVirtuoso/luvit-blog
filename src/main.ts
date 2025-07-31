import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);

  app.enableCors({ origin: ['http://localhost:5173'], Credential: true });

  app.use(
    session({
      secret: 'password',
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 60 * 60 * 1000 },
    }),
  );

  app.useStaticAssets(join(__dirname, '..', 'images'));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
