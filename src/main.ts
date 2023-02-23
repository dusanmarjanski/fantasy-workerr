// Common
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
// Module
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);
	await app.listen(configService.get('PORT'));
}
bootstrap();