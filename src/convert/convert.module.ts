// Module
import { Module } from '@nestjs/common';
import { FantasyApiModule } from '../fantasy-api/fantasy-api.module';
import { QuoteSolverModule } from '../quote-solver/quote-solver.module';
// Service
import { ConvertService } from './convert.service';

// Controller
import { ConvertController } from './convert.controller';

@Module({
	imports: [FantasyApiModule, QuoteSolverModule],
	providers: [ConvertService],
	controllers: [ConvertController],
})
export class ConvertModule {}
