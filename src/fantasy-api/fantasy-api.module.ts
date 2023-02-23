// Common
import { Module } from '@nestjs/common';
// Module
import { HttpModule } from '@nestjs/axios';
// Service
import { FantasyApiService } from './fantasy-api.service';

@Module({
	imports: [HttpModule],
	providers: [FantasyApiService],
	exports: [FantasyApiService],
})
export class FantasyApiModule {}
