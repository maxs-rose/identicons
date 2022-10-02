import { GeneratorOptions, SquareItem } from './utils';

export const createSquareSvg = (items: SquareItem[], options: GeneratorOptions) => {
	allSquarePositionsValid(items, options.size);

	const svg = [];
	svg.push(
		`<svg width="${options.imageSize}" height="${options.imageSize}" viewBox="0 0 ${options.imageSize} ${options.imageSize}" preserveAspectRatio="xMinYMin" xmlns="http://www.w3.org/2000/svg"> `
	);

	const boxSize = Math.floor(options.imageSize / (options.size + 1));
	const positions = squarePositionCalculator(options.size, options.imageSize);

	items.forEach((i) => {
		const index = positions.project(i.x, i.y);
		svg.push(
			`<rect x="${positions.x(index)}" y="${positions.y(index)}" width="${boxSize}" height="${boxSize}" fill="${
				i.color
			}" />`
		);
	});

	svg.push('</svg>');

	return svg.join('\n');
};

const allSquarePositionsValid = (positions: { x: number; y: number }[], size: number) => {
	let allValid = true;
	positions.forEach((item) => {
		if (item.x >= 0 && item.x < size && item.y >= 0 && item.y < size) return;

		console.error('Element did not pass validation', item);

		allValid = false;
	});

	// if (!allValid) throw new Error('Invalid box positions for icon found!');
};

const squarePositionCalculator = (size: number, imageSize: number) => {
	const boxSize = Math.floor(imageSize / (size + 1));
	const marginWidth = Math.floor(boxSize / 2 + (imageSize % (size + 1)) / 2);

	return {
		project: (x: number, y: number) => x + y * size,
		x: (i: number) => marginWidth + (i % size) * boxSize,
		y: (i: number) => marginWidth + (Math.floor(i / size) % size) * boxSize,
	};
};
