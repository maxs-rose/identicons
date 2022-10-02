import { createSquareSvg } from './svgWriter';

export const generateIconString = (data: string, options?: Partial<{ size: number; width: number }>) => {
	return createSquareSvg(
		[
			{ x: 0, y: 0, color: '#f8427e' },
			{ x: 1, y: 0, color: '#f8427e' },
			{ x: 2, y: 0, color: '#f8427e' },
			{ x: 3, y: 0, color: '#f8427e' },
			{ x: 4, y: 0, color: '#f8427e' },
			{ x: 0, y: 4, color: '#f8427e' },
			{ x: 1, y: 4, color: '#bbb529' },
			{ x: 2, y: 4, color: '#f8427e' },
			{ x: 3, y: 4, color: '#f8427e' },
			{ x: 4, y: 4, color: '#f8427e' },
		],
		{ size: 5, imageSize: 128, ...options }
	);
};

export const generateIconElement = (data: string, options?: {}): SVGElement => {
	const element = document.createElement('container');
	element.innerHTML = generateIconString(data, options);

	return element.firstChild as SVGElement;
};
