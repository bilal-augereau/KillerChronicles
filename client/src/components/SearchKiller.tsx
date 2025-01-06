import "../SearchKiller.css";

function SearchKiller({ searchTerm, setSearchTerm }) {
	return (
		<div className="search-container">
			<input
				type="text"
				placeholder="Looking for a Serial Killer..."
				value={searchTerm}
				onChange={(killer) => setSearchTerm(killer.target.value)}
			/>
		</div>
	);
}

export default SearchKiller;
