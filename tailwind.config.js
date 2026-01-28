import base from './config/tailwind.config.js';

// Ensure content globs resolve from project root
export default {
	...base,
	content: [
		'src/**/*.{js,jsx,ts,tsx}',
		'index.html',
	],
};
