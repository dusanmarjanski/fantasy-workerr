// Common
import * as XLSX from 'xlsx';
import { Inject, Injectable } from '@nestjs/common';
// Service
import { FantasyApiService } from '../fantasy-api/fantasy-api.service';
import { QuoteSolverService } from '../quote-solver/quote-solver.service';
// Types
import { Player } from 'src/types/fantasyApi';

@Injectable()
export class ConvertService {
	@Inject(FantasyApiService)
	private readonly fantasyApiService: FantasyApiService;
	@Inject(QuoteSolverService)
	private readonly quoteSolverService: QuoteSolverService;

	async saveXlsx() {
		// Get plasharper players
		const players = await this.fantasyApiService.getReport();
		const sheets = [];
		players.map((data: { player: Player }) => {
			const {
				player: {
					prob_60,
					prob_75,
					prob_90,
					name,
					position,
					xScore,
					xDecisive,
					xGoalsAndAssists,
					so5Scores,
				},
			} = data;

			const prob_50 = this.quoteSolverService.calculate(
				prob_60,
				prob_75,
				prob_90,
			);

			const sheetConfig = {
				Player: name,
				Position: position,
				'60+': prob_60,
				'75+': prob_75,
				'90+': prob_90,
				Expected: xScore,
				Decisive: xDecisive,
				'Goals and Assists': xGoalsAndAssists,
				'50%': Number.isNaN(prob_50) ? 0 : prob_50,
				'Sorare Total Score': so5Scores[0].score,
			};
			sheets.push(sheetConfig);
		});

		const workSheet = XLSX.utils.json_to_sheet(sheets);
		const workBook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet 1');
		XLSX.writeFile(workBook, `./report/gw-${players[0].gameweek}.xlsx`);

		return 'sucess';
	}
}
