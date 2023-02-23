// Common
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// Module
import { ConvertModule } from './convert/convert.module';
import { PlayersWriterModule } from './players-writer/players-writer.module';
// Controller
import { AppController } from './app.controller';
// Env
import { validateEnvironments } from './environment/env.validation';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: ['src/environment/.env'],
			validate: validateEnvironments,
			isGlobal: true,
		}),
		ConvertModule,
		PlayersWriterModule,
	],
	controllers: [AppController],
})
export class AppModule {}
