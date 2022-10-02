// Functions

import { Md5 } from './md5';

const hashData = (data: string) => Md5.hashStr(data);

export const toByteArray = (data: string) => {
	const hashedData = hashData(data);
	const bytes: number[] = [];

	for (let i = 0; i < hashedData.length / 2; i++) {
		const byteI = hashedData.length - (i + 1) * 2;
		bytes.push(Number.parseInt(hashedData.slice(byteI, byteI + 2), 16));
	}

	return bytes;
};

export const toBitArray = (data: string) =>
	toByteArray(hashData(data))
		.map(intToBitString)
		.join('')
		.split('')
		.map((n) => Number.parseInt(n, 2));

const intToBitString = (n: number) => n.toString(2);
const intToByteString = (n: number) => ('0' + n.toString(16)).slice(-2);

export const generateColor = (data: string): SquareItem['color'] => {
	const bytes = toByteArray(hashData(data)).reverse();

	return `#${bytes
		.slice(bytes.length - 3, bytes.length)
		.map(intToByteString)
		.join('')}`;
};

// Types
export type Option = 'square';
export type GeneratorOptions = { size: number; imageSize: number };

export type SquareItem = { x: number; y: number; color: `#${string}` };

// Consts
export const defaultGeneratorSize: Pick<GeneratorOptions, 'size' | 'imageSize'> = { size: 5, imageSize: 128 };
