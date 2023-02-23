// Common
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
	@Get('healthcheck')
	healthcheck() {
		return { status: 'Healthy' };
	}
}
