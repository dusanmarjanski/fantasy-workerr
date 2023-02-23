// Common
import { uniqWith, isEqual } from 'lodash';
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';
// Service
import { FantasyApiService } from 'src/fantasy-api/fantasy-api.service';
import { QuoteSolverService } from 'src/quote-solver/quote-solver.service';
// Event
import { PlayersCreatedEvent } from './events/players-created.event';
// Types
import { FantasyApi } from 'src/types/fantasyApi';
import { Result } from 'src/types/playersWriter';
// Utils
import { roundNumber } from 'src/utils/roundNumber';

@Injectable()
export class PlayersWriterService {
	@Inject(FantasyApiService)
	private readonly fantasyApiService: FantasyApiService;
	@Inject(QuoteSolverService)
	private readonly quoteSolverService: QuoteSolverService;
	@Inject('PLAYERS_SERVICE')
	private readonly playerClient: ClientKafka;
	private readonly logger = new Logger(PlayersWriterService.name);

	async createPlayer() {
		// Get plasharper players
		const playersData = await this.fantasyApiService.getPlayers();

		if (!playersData) return;

		const result: Result = {
			gameWeek: 0,
			startDate: '',
			endDate: '',
			competitions: [],
			games: [],
			players: [],
		};

		// Calcualte odds and prepare data for DB
		playersData.map((data: FantasyApi) => {
			const { gameweek, startDate, endDate, competition, game, player } = data;
			const {
				gameId,
				name,
				slug,
				picture,
				position,
				last5_score,
				last15_score,
				so5Scores,
				prob_60,
				prob_75,
				prob_90,
				teamName,
			} = player;
			result.gameWeek = gameweek;
			result.startDate = startDate;
			result.endDate = endDate;
			result.competitions.push(competition);

			game.compName = competition.name;
			result.games.push(game);

			// Calculate base and clean data for player
			// Past scores
			const cleanSo5Scores = [];
			so5Scores.map((score) => {
				cleanSo5Scores.push(score.score);
			});
			// Player
			const calculateCleanPlayer = {
				gameId,
				gameWeek: gameweek,
				gameDate: game.gameDate,
				name,
				slug,
				base: roundNumber(
					Number(this.quoteSolverService.calculate(prob_60, prob_75, prob_90)),
				),
				teamName,
				picture,
				position,
				last5Score: last5_score,
				last15Score: last15_score,
				so5Scores: cleanSo5Scores,
				minsPlayed: null,
				totalScore: null,
			};

			// Bad quotes callulation fallback
			if (calculateCleanPlayer.base) result.players.push(calculateCleanPlayer);
		});

		// Remove duplicates
		result.competitions = uniqWith(result.competitions, isEqual);
		result.games = uniqWith(result.games, isEqual);

		// Send players to DB Writer via Kafka
		this.playerClient.emit(
			'send_players_to_DB',
			new PlayersCreatedEvent(result),
		);
	}

	getPastScores(players: any) {
		// Get players past scores
		return this.fantasyApiService.getPastScores(players);
	}

	@Cron(CronExpression.EVERY_10_MINUTES, { name: 'Refresh players in DB' })
	createPlayerSchedule() {
		this.createPlayer();
		this.logger.log('Refreshing players in DB...');
	}
}
