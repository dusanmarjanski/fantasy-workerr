// 75.61 ---> 75.65
// 75.59 ----> 75.55
export function roundNumber(num: number) {
	const temp = num.toFixed(2);
	const lastNum = parseInt(temp[temp.length - 1]);
	let roundNumber = num;

	if (lastNum > 5) {
		roundNumber = Number((Number(num.toFixed(1)) - 0.05).toFixed(2));
	}

	if (lastNum < 5) {
		roundNumber = Number((Number(num.toFixed(1)) + 0.05).toFixed(2));
	}

	return roundNumber;
}
