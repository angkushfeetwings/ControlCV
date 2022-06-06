/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		LOCAL_URL: "http://localhost:9000/api",
	},
};

module.exports = nextConfig;
