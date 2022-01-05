import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setUpSwagger(app:INestApplication){
    const option = new DocumentBuilder()
    .setTitle('Storage App API Docs')
    .setDescription('Storage App API Document')
    .setVersion('0.0.1')
    .build();

    const document = SwaggerModule.createDocument(app,option);
    SwaggerModule.setup('api-docs',app,document);
}