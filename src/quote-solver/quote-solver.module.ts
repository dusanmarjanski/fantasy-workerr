// Common
import { Module } from '@nestjs/common';
// Service
import { QuoteSolverService } from './quote-solver.service';

@Module({
	providers: [QuoteSolverService],
	exports: [QuoteSolverService],
})
export class QuoteSolverModule {}
