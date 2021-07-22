import { INestApplication, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'fs';

@Injectable()
export class OpenApiService {
  constructor(private configService: ConfigService) {}

  public start(app: INestApplication): void {
    if (this.configService.get('ENABLE_OPENAPI')?.toLowerCase() === 'true') {
      const packageJson = JSON.parse(readFileSync('package.json').toString());
      const openApiConfig = new DocumentBuilder()
        .setTitle(packageJson.name)
        .setDescription(packageJson.description)
        .setVersion(packageJson.version)
        .build();
      const document = SwaggerModule.createDocument(app, openApiConfig);
      SwaggerModule.setup('api', app, document);
    }
  }
}
