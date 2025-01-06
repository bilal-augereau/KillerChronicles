import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import Killersdata from "./Killersdata.json" assert { type: "json" };

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get("/killers", (req, res) => {
	res.json(Killersdata.serial_killers);
});

app.post("/killers", (req, res) => {
	const newKiller = req.body;
	Killersdata.serial_killers.push(newKiller);
	res.status(201).json(newKiller);
});

app.delete("/killers/:index", (req, res) => {
	const { index } = req.params;
	Killersdata.serial_killers = Killersdata.serial_killers.filter(
		(killer) => killer.index !== Number(index),
	);
	res.status(204).send();
});

app.get("/killers/search", (req, res) => {
	const { query } = req.query;
	const filteredKillers = Killersdata.serial_killers.filter((killer) =>
		killer.name.toLowerCase().includes(query.toLowerCase()),
	);
	res.json(filteredKillers);
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
