// Common
import { Controller, Get } from '@nestjs/common';
// Service
import { ConvertService } from './convert.service';

@Controller('convert')
export class ConvertController {
	constructor(private readonly convertService: ConvertService) {}

	@Get('/report')
	getData() {
		return this.convertService.saveXlsx();
	}
}
