import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';  // 추가 1

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

/////////////////////////////////////////////////////////////// 추가 2 Start

  // Swagger 설정                                                                                               
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('NestJS API 문서입니다.')
    .setVersion('1.0')
    .addBearerAuth() // JWT 인증 추가 (선택 사항)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

/////////////////////////////////////////////////////////////// 추가 2 End

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
