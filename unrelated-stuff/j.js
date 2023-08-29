const collatzCache = [null, 1];

let calc = 0;
function countCollatz(n) {
	calc = 0;
	const value = collatz(n);
	// console.log(calc);
	return value;
}

function collatz(n) {
	if (collatzCache[n]) {
		return collatzCache[n];
	}
	return collatzCache[n] = 1 + collatz(n % 2 === 0 ? n / 2 : 3 * n + 1);
}


function f(x) {
    return x/2 * (x + 1);
}


function countDivisors(n) {
	//	1, n => 2
	//	2...n-1 / HIT => 
	const limit = Math.sqrt(n);
	let count = 2 + (limit * limit === n ? 1 : 0);
	for (let i = 2; i < limit; i++) {
		if (n % i === 0) {
			count += 2;
		}
	}
	return count;
}

function getUntil(n) {
	let m = 0;
	let i = 0;
	while(m < n) {
		m = countDivisors(f(++i));
	}
	return [f(i), countDivisors(f(i))];
}


const cacheRoutes = [];
function countRoutes(m, n) {
	if(m === 0 || n === 0) {
		return 1;
	}
	if (cacheRoutes[m]?.[n]) {
		return cacheRoutes[m][n];
	}
	if (!cacheRoutes[m]) {
		cacheRoutes[m] = [];
	}
	return cacheRoutes[m][n] = countRoutes(m - 1, n) + countRoutes(m, n - 1);
}

function twoExp(count = 0) {
	array = [1];
	for (let i = 0; i < count; i++) {
		let remainder = 0;
		for (let i = 0; i < array.length || remainder; i++) {
			const dbl = (array[i] ?? 0) * 2 + remainder;
			const digit = dbl % 10;
			if (i === array.length) {
				array.push(0);
			}
			array[i] = digit;
			remainder = (dbl - digit) / 10;
		}
	}
	return array.reverse();
}