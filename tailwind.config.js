/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./index.html",
		"./music/*.html",
		"./album.html",
		"./tour-dates.html",
		"./event.html",
		"./shop.html",
		"./single-product.html",
		"./videos.html",
		"./cart.html",
		"./checkout.html",
		"./error.html",
	],
	theme: {
		extend: {
			colors: {
				primary: '#000000',
				secondary: '#ffffff',
				muted: '#a5a5a5',
				light: '#f7f7f7',
				'light-alt': '#f4f4f4',
				dark: '#0a0a0a',
			},
			fontFamily: {
				poppins: ['Poppins', 'sans-serif'],
			},
			maxWidth: {
				'1300': '1300px',
			},
		},
	},
	plugins: [],
}