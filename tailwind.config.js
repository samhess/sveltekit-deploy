import { join } from 'path'
//import type { Config } from 'tailwindcss';

import { skeleton } from '@skeletonlabs/tw-plugin'

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'),'../**/*.{html,js,svelte,ts}')	
	],
	theme: {
		extend: {},
	},
	plugins: [
		require('@tailwindcss/forms'),
		skeleton({
			themes: { preset: [ "crimson" ] }
		})
	],
}
