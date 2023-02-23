// Testing
import { Test, TestingModule } from '@nestjs/testing';
// Module
import { HttpModule } from '@nestjs/axios';
// Service
import { FantasyApiService } from './fantasy-api.service';

describe('PlaysharperService', () => {
	let service: FantasyApiService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [FantasyApiService],
			imports: [HttpModule],
		}).compile();

		service = module.get<FantasyApiService>(FantasyApiService);
	});

	it('FantasyApiService - should be defined', () => {
		expect(service).toBeDefined();
	});
});
