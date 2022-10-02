const s = [
	7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4,
	11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
] as const;
const k = [
	0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501, 0x698098d8,
	0x8b44f7af, 0xffff5bb1, 0x895cd7be, 0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821, 0xf61e2562, 0xc040b340,
	0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8, 0x21e1cde6, 0xc33707d6, 0xf4d50d87,
	0x455a14ed, 0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a, 0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c,
	0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70, 0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05, 0xd9d4d039,
	0xe6db99e5, 0x1fa27cf8, 0xc4ac5665, 0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92,
	0xffeff47d, 0x85845dd1, 0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1, 0xf7537e82, 0xbd3af235, 0x2ad7d2bb,
	0xeb86d391,
] as const;

const transformAndPadData = (inputData: string) => {
	const unpaddedBitStream =
		'1' +
		inputData
			.split('')
			// Convert characters into charcodes
			.map((char) => char.charCodeAt(0))
			// Convert charcode into binary
			.map((v) => v.toString(2))
			.join('');

	return unpaddedBitStream.padEnd(unpaddedBitStream.length + (512 - (unpaddedBitStream.length % 512)), '0');
};

const rot = (data: number, rotations: number) => {
	const dataString = data.toString(2);
	const rot = rotations % dataString.length;

	return Number.parseInt(dataString.slice(0, rot).concat(dataString.slice(rot, dataString.length)), 2);
};

const chunks = (paddedData: string, size: number) =>
	paddedData
		.split('')
		.reduce((acc, item, index) => {
			const chunkIndex = Math.floor(index / size);

			if (!acc[chunkIndex]) acc[chunkIndex] = [];

			acc[chunkIndex].push(Number.parseInt(item, 2));

			return acc;
		}, [] as number[][])
		.map((chunk) => chunk.join(''));

export const hash = (inputData: string) => {
	// Based on md5 hash but, its not actually generating the correct hash but its close enough for this purpose
	const formattedData = transformAndPadData(inputData);
	const chunk = chunks(formattedData, 512);

	let a0 = 0x67452301;
	let b0 = 0xefcdab89;
	let c0 = 0x98badcfe;
	let d0 = 0x10325476;

	chunk.forEach((chunk) => {
		const m = chunks(chunk, 32);
		// console.log(chunk.toString(2), m.length);

		let a = a0;
		let b = b0;
		let c = c0;
		let d = d0;

		for (let i = 0; i < 64; i++) {
			let f = 0;
			let g = 0;

			if (0 >= i && i <= 15) {
				f = (b & c) | (~b & d);
				g = i;
			} else if (16 >= i && i <= 31) {
				f = (d & b) | (~d & c);
				g = (5 * i + 1) % 16;
			} else if (32 >= i && i <= 47) {
				f = b ^ c ^ d;
				g = (3 * i + 5) % 16;
			} else if (48 >= i) {
				f = c ^ (b | ~d);
				g = (7 * i) % 16;
			}

			f += a + k[i] + Number.parseInt(m[g], 2);
			a = d;
			d = c;
			c = b;
			b += rot(f, -s[i]);
		}

		a0 += a;
		b0 += b;
		c0 += c;
		d0 += d;
	});

	// console.log(a0, b0, c0, d0, (a0 + b0 + c0 + d0).toString(16));

	return a0.toString(16) + b0.toString(16) + c0.toString(16) + d0.toString(16);
};
