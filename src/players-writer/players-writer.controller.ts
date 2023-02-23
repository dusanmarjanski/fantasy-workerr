// Common
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
// Service
import { PlayersWriterService } from './players-writer.service';

@Controller('players-writer')
export class PlayersWriterController {
	constructor(private readonly playersWriterService: PlayersWriterService) {}

	@Get('past-scores')
	getPlayersPastScores(@Req() request: Request) {
		const pastScores = this.playersWriterService.getPastScores(
			request.query.players as string[],
		);
		if (!pastScores) return null;
		return pastScores;
	}
}
