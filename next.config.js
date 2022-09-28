/** @type {import('next').NextConfig} */
module.exports = {
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination:
					"https://asia-southeast2-sejutacita-app.cloudfunctions.net/:path*",
			},
		];
	},
};
