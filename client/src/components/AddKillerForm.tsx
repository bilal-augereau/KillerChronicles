import { useState } from "react";
import "../AddKillerForm.css";

interface Killer {
	index: number;
	name: string;
	weapon: string;
	gender: string;
	age: number;
	picture: string;
	location: string;
	description: string;
}

interface AddKillerFormProps {
	addKiller: (killer: Killer) => void;
}

const AddKillerForm = ({ addKiller }: AddKillerFormProps) => {
	const [name, setName] = useState("");
	const [weapon, setWeapon] = useState("");
	const [gender, setGender] = useState("");
	const [age, setAge] = useState("");
	const [picture, setPicture] = useState("");
	const [location, setLocation] = useState("");
	const [description, setDescription] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		const newKiller = {
			index: Date.now(),
			name,
			weapon,
			gender,
			age: Number(age),
			picture,
			location,
			description,
		};
		addKiller(newKiller);
		resetForm();
	};

	const resetForm = () => {
		setName("");
		setWeapon("");
		setGender("");
		setAge("");
		setPicture("");
		setLocation("");
		setDescription("");
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		const file = e.dataTransfer.files[0];
		if (file?.type.startsWith("image/")) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPicture(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
	};

	return (
		<form onSubmit={handleSubmit} className="killer-form">
			<h2>Add Serial Killer</h2>
			<div
				className="drag-drop-area"
				onDrop={handleDrop}
				onDragOver={handleDragOver}
			>
				{picture ? (
					<img src={picture} alt="Preview" className="image-preview" />
				) : (
					<p>Drag and drop an image here</p>
				)}
			</div>
			<input
				type="text"
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder="Name"
				required
			/>
			<input
				type="text"
				value={weapon}
				onChange={(e) => setWeapon(e.target.value)}
				placeholder="Weapon"
				required
			/>
			<input
				type="text"
				value={gender}
				onChange={(e) => setGender(e.target.value)}
				placeholder="Gender"
				required
			/>
			<input
				type="number"
				value={age}
				onChange={(e) => setAge(e.target.value)}
				placeholder="Age"
				required
			/>
			<input
				type="text"
				value={location}
				onChange={(e) => setLocation(e.target.value)}
				placeholder="Location"
				required
			/>
			<textarea
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				placeholder="Description"
				required
			/>
			<button type="submit">ADD</button>
		</form>
	);
};

export default AddKillerForm;
