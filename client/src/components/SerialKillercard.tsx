import "../SerialKillercard.css";

interface KillerProps {
	killer: {
		index: number;
		name: string;
		weapon: string;
		gender: string;
		age: number;
		picture: string;
		location: string;
		description: string;
	};
	deleteKiller: (index: number) => void;
}

function SerialKillerCard({ killer, deleteKiller }: KillerProps) {
	return (
		<div className="card">
			<img src={killer.picture} alt={killer.name} />
			<h2>{killer.name}</h2>
			<div className="card-align">
				<p>
					<strong>Weapon:</strong> {killer.weapon}
				</p>
				<p>
					<strong>Gender:</strong> {killer.gender}
				</p>
				<p>
					<strong>Age:</strong> {killer.age}
				</p>
				<p>
					<strong>Location:</strong> {killer.location}
				</p>
				<p>{killer.description}</p>
			</div>
			<button type="button" onClick={() => deleteKiller(killer.index)}>
				🔪
			</button>
		</div>
	);
}

export default SerialKillerCard;
