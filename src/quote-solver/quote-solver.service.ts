// Common
import { Injectable } from '@nestjs/common';

@Injectable()
export class QuoteSolverService {
	private solve(a: number, b: number, c: number): number[] {
		if (a == null || b == null || c == null)
			throw new TypeError('Wrong values!');

		let solution1: number;
		let solution2: number;
		let discriminant: number;
		if (a === 0 || a === -0) {
			solution2 = -c / b;
		} else {
			solution1 = (-1 * b + Math.sqrt(Math.pow(b, 2) + -4 * a * c)) / (2 * a); // First solution possible
			solution2 = (-1 * b - Math.sqrt(Math.pow(b, 2) + -4 * a * c)) / (2 * a); // Second solution possible
			discriminant = Math.pow(b, 2) + -4 * a * c; // Discriminant (b²-4ac)
		}

		return [solution1, solution2, discriminant];
	}

	calculate(prob_60: number, prob_75: number, prob_90: number) {
		//1
		const x1a = 3600;
		const x1b = 60;
		const x1c = 1;

		// 2
		const x2a = 5625;
		const x2b = 75;
		const x2c = 1;

		// 3
		const x3a = 8100;
		const x3b = 90;
		const x3c = 1;

		const dtr =
			x1a * x2b * x3c +
			x1b * x2c * x3a +
			x1c * x2a * x3b -
			(x1c * x2b * x3a + x1a * x2c * x3b + x2a * x1b * x3c);

		const x1aResult = x2b * x3c - x2c * x3b;
		const x1bResult = x1c * x3b - x1b * x3c;
		const x1cResult = x1b * x2c - x1c * x2b;

		const x2aResult = x2c * x3a - x2a * x3c;
		const x2bResult = x1a * x3c - x1c * x3a;
		const x2cResult = x1c * x2a - x1a * x2c;

		const x3aResult = x2a * x3b - x2b * x3a;
		const x3bResult = x1b * x3a - x1a * x3b;
		const x3cResult = x1a * x2b - x1b * x2a;

		let x: number;
		let y: number;
		let z: number;

		if (dtr != 0) {
			const xEq =
				(prob_60 * x1aResult + prob_75 * x1bResult + prob_90 * x1cResult) / dtr;
			const yEq =
				(prob_60 * x2aResult + prob_75 * x2bResult + prob_90 * x2cResult) / dtr;
			const zEq =
				(prob_60 * x3aResult + prob_75 * x3bResult + prob_90 * x3cResult) / dtr;

			x = Math.round(xEq * 10000) / 10000;
			y = Math.round(yEq * 10000) / 10000;
			z = Math.round(zEq * 10000) / 10000;
		} else {
			x = 0;
			y = 0;
			z = 0;
		}

		const prob_50 = this.solve(x, y, z - 0.5)[1];

		return prob_50.toFixed(2);
	}
}
