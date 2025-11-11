import express from "express";

const app = express();
const PORT = 4000;

// Simple external student list mock
app.get("/api/class/:classCode/students", (req, res) => {
	const { classCode } = req.params;

	// Example external data
	const externalStudents = [
		{ email: "extstudent1@gmail.com", name: "External Student 1" },
		{ email: "extstudent2@gmail.com", name: "External Student 2" },
	];

	console.log(`➡️ External API called for class ${classCode}`);
	res.json(externalStudents);
});

app.listen(PORT, () => {
	console.log(`✅ Mock external API running at http://localhost:${PORT}`);
});
