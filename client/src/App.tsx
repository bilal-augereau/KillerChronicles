import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import SerialKillercard from "./components/SerialKillercard";
import AddKillerForm from "./components/AddKillerForm";
import SearchKiller from "./components/SearchKiller";
import { useEffect } from "react";

function App() {
	const [killers, setKillers] = useState<
		Array<{
			name: string;
			index: number;
			weapon: string;
			gender: string;
			age: number;
			picture: string;
			location: string;
			description: string;
		}>
	>([]);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		fetch("http://localhost:5000/killers")
			.then((response) => response.json())
			.then((data) => setKillers(data));
	}, []);

	const addKiller = (newKiller: {
		name: string;
		index: number;
		weapon: string;
		gender: string;
		age: number;
		picture: string;
		location: string;
		description: string;
	}) => {
		fetch("http://localhost:5000/killers", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newKiller),
		})
			.then((response) => response.json())
			.then((addedKiller) =>
				setKillers((prevKillers) => [...prevKillers, addedKiller]),
			);
	};

	const deleteKiller = (index: number) => {
		fetch(`http://localhost:5000/killers/${index}`, { method: "DELETE" }).then(
			() =>
				setKillers((prevKillers) =>
					prevKillers.filter((killer) => killer.index !== index),
				),
		);
	};

	const filteredKillers = killers.filter((killer) =>
		killer.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<div className="main-content">
			<Header />
			<SearchKiller searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			<div className="card-container">
				{filteredKillers.map((killer) => (
					<SerialKillercard
						key={killer.index}
						killer={killer}
						deleteKiller={deleteKiller}
					/>
				))}
				<AddKillerForm addKiller={addKiller} />
			</div>
		</div>
	);
}

export default App;
