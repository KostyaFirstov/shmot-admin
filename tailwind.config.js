/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {},
		screens: {
			sm: '480px',
			md: '768px',
			lg: '976px',
			xl: '1440px'
		},
		colors: {
			orange: '#FFA048',
			orangeLite: '#FFD1A7',
			powerRed: '#FD5858',
			red: '#ECACAC',
			green: '#78D700',
			greenLite: '#CDFF8F',
			gray: '#8E8E90',
			grayLite: '#F2F2F2',
			dark: '#1C1D22',
			white: '#fff',
			errorColor: '#AC5151'
		},
		fontFamily: {
			exo: ['Exo 2', 'sans-serif']
		},
		borderRadius: {
			none: '0',
			sm: '12px',
			normal: '18px',
			DEFAULT: '22px',
			full: '100%'
		}
	},
	plugins: []
}
