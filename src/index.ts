import { defaultGeneratorSize, GeneratorOptions } from './utils';
import { generateSquareIcon } from './square';

export const generateIconString = (data: string, options?: Partial<GeneratorOptions>) => {
	return generateSquareIcon(data, { ...defaultGeneratorSize, ...options });
};

export const generateIconElement = (data: string, options?: {}): SVGElement => {
	const element = document.createElement('container');
	element.innerHTML = generateIconString(data, options);

	return element.firstChild as SVGElement;
};
