// Common
import { NotFoundException, Injectable, HttpException } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
// Service
import { HttpService } from '@nestjs/axios';
// Types
import { FantasyApi, PastScores } from 'src/types/fantasyApi';

@Injectable()
export class FantasyApiService {
	constructor(private http: HttpService) {}
	private headers = {
		Accept: 'application/json, text/plain, */*',
	};

	async getReport(): Promise<FantasyApi[]> {
		const { data } = await firstValueFrom(
			this.http
				.get(`${process.env.API_URL}:${process.env.API_PORT}/report`, {
					headers: this.headers,
				})
				.pipe(
					catchError((err) => {
						throw new NotFoundException('Fantasy API report', err.message);
					}),
				),
		);
		return data;
	}

	async getPlayers(): Promise<FantasyApi[]> {
		try {
			const { data } = await firstValueFrom(
				this.http
					.get(`${process.env.API_URL}:${process.env.API_PORT}`, {
						headers: this.headers,
					})
					.pipe(
						catchError((err) => {
							throw new HttpException(
								`Get players - ${err.response.statusText}`,
								err.response.status,
							);
						}),
					),
			);
			return data;
		} catch (error) {
			console.log(error.response, error.status);
			console.log('url', `${process.env.API_URL}:${process.env.API_PORT}`);
		}
	}

	async getPastScores(players: string[]): Promise<PastScores[]> {
		const { data } = await firstValueFrom(
			this.http
				.get(`${process.env.API_URL}:${process.env.API_PORT}/past-scores`, {
					headers: this.headers,
					params: { players },
				})
				.pipe(
					catchError((err) => {
						console.log(`Get past scores - ${err.response.statusText}`);
						throw new HttpException(
							`Get past scores - ${err.response.statusText}`,
							err.response.status,
						);
					}),
				),
		);
		return data;
	}
}
