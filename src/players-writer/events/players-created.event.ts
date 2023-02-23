import { Result } from 'src/types/playersWriter';

export class PlayersCreatedEvent {
	constructor(public readonly result: Result) {}

	toString() {
		return JSON.stringify({
			result: this.result,
		});
	}
}
