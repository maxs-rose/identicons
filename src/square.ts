import { generateColor, GeneratorOptions, SquareItem, toBitArray, toByteArray } from './utils';
import { createSquareSvg } from './svgWriter';

export const generateSquareIcon = (data: string, options: Omit<GeneratorOptions, 'option'>) => {
	const color = generateColor(data);
	const bits: number[] = [];

	const size = options.size;
	// Ensure we will always have enough data to fill the image
	while (bits.length < size * size) {
		const hashable = `${data}${new Array(bits.length).fill(' ').join('')}`;
		const bytes = toByteArray(hashable);

		bits.push(...toBitArray((bits.length % 2 === 0 ? bytes : bytes.reverse()).join('')));
	}

	const boxes: SquareItem[] = [];

	for (let y = 0; y < size; y++) {
		for (let x = 0; x < Math.ceil(size / 2); x++) {
			if (bits[y * size + x] === 1) {
				boxes.push({
					x,
					y,
					color,
				});

				boxes.push({
					x: size - x - 1,
					y,
					color,
				});
			}
		}
	}

	return createSquareSvg(boxes, options);
};
