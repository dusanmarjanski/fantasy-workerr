// Testing
import { Test, TestingModule } from '@nestjs/testing';
// Service
import { QuoteSolverService } from './quote-solver.service';

describe('QuoteSolverService', () => {
	let service: QuoteSolverService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [QuoteSolverService],
		}).compile();

		service = module.get<QuoteSolverService>(QuoteSolverService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
