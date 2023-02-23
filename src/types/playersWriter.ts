import { Competition, Game } from './fantasyApi';

export interface Result {
	gameWeek: number;
	startDate: string;
	endDate: string;
	competitions: Competition[];
	games: Game[];
	players: CleanPlayer[];
}

export interface CleanPlayer {
	gameId: string;
	gameWeek: number;
	gameDate: Date;
	name: string;
	slug: string;
	base: number;
	teamName: string;
	picture: string;
	position: string;
	last5Score: number;
	last15Score: number;
	so5Scores: number[];
	minsPlayed: number | null;
	totalScore: number | null;
}
