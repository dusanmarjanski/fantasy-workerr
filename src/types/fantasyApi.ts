export interface FantasyApi {
	gameweek: number;
	startDate: string;
	endDate: string;
	competition: Competition;
	game: Game;
	player: Player;
}

export interface Competition {
	compId: string;
	name: string;
	picture: string;
}

export interface Game {
	gameId: string;
	gameDate: Date;
	compName: string;
	compId: string;
	homeId: string;
	homeName: string;
	homePicture: string;
	awayId: string;
	awayName: string;
	awayPicture: string;
}

export interface Player {
	gameId: string;
	xScore: number;
	xDecisive: number;
	prob_60: number;
	prob_75: number;
	prob_90: number;
	prob_starter: number;
	xGoalsAndAssists: number;
	id: string;
	slug: string;
	name: string;
	picture: string;
	position: string;
	shirt_number: number;
	playing_status: string;
	last5_score: number;
	last15_score: number;
	last5_played: number;
	last15_played: number;
	dnp_status: string;
	teamName: string;
	so5Scores: So5Scores[];
}

export interface So5Scores {
	score: number;
}

export interface PastScores {
	slug: string;
	so5Scores: pastSo5Scores[];
}

interface pastSo5Scores {
	score: number;
	playerGameStats: {
		minsPlayed: number | null;
	};
	game: {
		date: Date;
		status: string;
	};
}
