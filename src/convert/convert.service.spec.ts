// Testing
import { Test, TestingModule } from '@nestjs/testing';
// Module
import { HttpModule } from '@nestjs/axios';
// Service
import { ConvertService } from './convert.service';
import { FantasyApiService } from '../fantasy-api/fantasy-api.service';
import { QuoteSolverService } from '../quote-solver/quote-solver.service';

describe('ConvertService', () => {
	let service: ConvertService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ConvertService, FantasyApiService, QuoteSolverService],
			imports: [HttpModule],
		}).compile();

		service = module.get<ConvertService>(ConvertService);
	});

	it('ConvertService - should be defined', () => {
		expect(service).toBeDefined();
	});
});
