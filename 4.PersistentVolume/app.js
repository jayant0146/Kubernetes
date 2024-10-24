const path = require("path");
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const filePath = path.join(__dirname, process.env.STORY_VAR, "text.txt");

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // In case the form data is sent

// Handle GET requests to retrieve the story
app.get("/story", (req, res) => {
	fs.readFile(filePath, (err, data) => {
		if (err) {
			return res.status(500).json({ message: "Failed to open file." });
		}
		res.status(200).json({ story: data.toString() });
	});
});

// Handle POST requests to append new text to the story
app.post("/story", (req, res) => {
	const newText = req.body.text;

	// Check if newText exists and is not empty
	if (!newText || newText.trim().length === 0) {
		return res.status(422).json({ message: "Text must not be empty!" });
	}

	// Append new text to the file
	fs.appendFile(filePath, newText + "\n", (err) => {
		if (err) {
			return res.status(500).json({ message: "Storing the text failed." });
		}
		res.status(201).json({ message: "Text was stored!" });
	});
});

// Start the server
app.listen(3000, () => {
	console.log("Server running on port 3000");
});
