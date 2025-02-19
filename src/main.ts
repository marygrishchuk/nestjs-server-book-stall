import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigurationType } from './core/config/configurationType';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // turning on the global validation pipe https://docs.nestjs.com/techniques/validation
  app.useGlobalPipes(new ValidationPipe());

  // allowing requests from any domains
  app.enableCors({
    origin: '*', // Разрешает запросы с любых доменов
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Разрешенные методы
    credentials: true, // Включает передачу cookies
  });

  const config = new DocumentBuilder()
    .setTitle('Book Stall Server API')
    .setDescription('This is API docs that you can use to make REST API calls to this Book Stall server.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, { customSiteTitle: 'Book Stall Server - API docs' });

  // getting the config service https://docs.nestjs.com/techniques/configuration#using-in-the-maints
  const configService = app.get(ConfigService<ConfigurationType>);
  const port = configService.get('apiSettings.PORT', { infer: true })!;

  await app.listen(port);
}
bootstrap();
