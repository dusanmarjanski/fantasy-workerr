// Common
import { Logger, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
// Module
import { FantasyApiModule } from '../fantasy-api/fantasy-api.module';
import { QuoteSolverModule } from '../quote-solver/quote-solver.module';
// Service
import { PlayersWriterService } from './players-writer.service';
// Controller
import { PlayersWriterController } from './players-writer.controller';
import { ScheduleModule, SchedulerRegistry } from '@nestjs/schedule';
// Env
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: join(__dirname, '../../src/environment', '/.env') });
const KAFKA_URL = process.env.KAFKA_URL;

@Module({
	imports: [
		ClientsModule.register([
			{
				name: 'PLAYERS_SERVICE',
				transport: Transport.KAFKA,
				options: {
					client: {
						clientId: 'fantasy-db-writer',
						brokers: [KAFKA_URL],
					},
					consumer: {
						groupId: 'players-consumer-client',
						metadataMaxAge: 60000,
					},
				},
			},
		]),
		ScheduleModule.forRoot(),
		FantasyApiModule,
		QuoteSolverModule,
	],
	providers: [PlayersWriterService],
	controllers: [PlayersWriterController],
})
export class PlayersWriterModule {
	constructor(
		private readonly playersWtiterService: PlayersWriterService,
		private schedulerRegistry: SchedulerRegistry,
	) {
		this.getPlayers();
	}
	private readonly logger = new Logger(PlayersWriterModule.name);

	getPlayers() {
		const establishPlayersTimeout = setTimeout(
			() => this.establishPlayersConnection(),
			30000,
		);

		this.schedulerRegistry.addTimeout(
			`establish_players`,
			establishPlayersTimeout,
		);
	}

	private establishPlayersConnection() {
		this.logger.log('Sending all players for the first time...');
		this.playersWtiterService.createPlayer();
	}
}
