const express = require("express");

const app = express();

app.get("/", (req, res) => {
	res.send(`
    <h1>Hello from this NodeJS app!</h1>
    <h3> This is the new content, lets check for the updated deployments!!! </h3>
    <p>Try sending a request to /error and see what happens</p>
  `);
});

app.get("/error", (req, res) => {
	process.exit(1);
});

app.listen(8080);
