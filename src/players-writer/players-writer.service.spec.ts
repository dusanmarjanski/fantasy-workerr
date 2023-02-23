import { Test, TestingModule } from '@nestjs/testing';
import { PlayersWriterService } from './players-writer.service';

describe('PlayersWriterService', () => {
	let service: PlayersWriterService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [PlayersWriterService],
		}).compile();

		service = module.get<PlayersWriterService>(PlayersWriterService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
