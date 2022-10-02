import { defaultGeneratorSize, GeneratorOptions } from './utils';
import { generateSquareIcon } from './square';
import { hash } from './hash';

export const generateIconString = (data: string, options?: Partial<GeneratorOptions>) => {
	return generateSquareIcon(data, { ...defaultGeneratorSize, ...options });
};

export const generateIconElement = (data: string, options?: {}): SVGElement => {
	console.log(hash(data));

	const element = document.createElement('container');
	element.innerHTML = generateIconString(data, options);

	return element.firstChild as SVGElement;
};
