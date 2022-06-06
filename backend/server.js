process.on("uncaughtException", error => {
	console.log("Uncaught exception error caused the server to crash\n", error);
});
process.on("unhandledRejection", error => {
	console.log("Unhandled rejection error caused the server to crash\n", error);
});

const app = require("./app");

const PORT = process.env.PORT || 1338;

app.listen(PORT, () => {
	console.log(`Listening on http://localhost:${PORT}`);
});
