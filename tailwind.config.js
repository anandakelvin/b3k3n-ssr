const Constants = require("./src/utils/constants.js");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: Constants.primaryColor,
			},
		},
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: [],
	},
};
