import { useEffect, useState } from 'react';
import './App.css';
import FacilityForm from './components/FacilityForm';
import FacilityTable from './components/FacilityTable';
import {
	getAllFacilities,
	createFacility,
	updateFacility,
	deleteFacility,
} from './services/facilityService';

function App() {
	const initialFormState = {
		name: '',
		type: '',
		capacity: '',
		location: '',
		status: '',
		availableFrom: '',
		availableTo: '',
		description: '',
	};

	const [facilities, setFacilities] = useState([]);
	const [formData, setFormData] = useState(initialFormState);
	const [editingId, setEditingId] = useState(null);
	const [error, setError] = useState('');
	const [search, setSearch] = useState('');

	useEffect(() => {
		loadFacilities();
	}, []);

	const loadFacilities = async () => {
		try {
			const response = await getAllFacilities();
			setFacilities(response.data);
			setError('');
		} catch (err) {
			console.error(err);
			setError('Failed to load facilities');
		}
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const resetForm = () => {
		setFormData(initialFormState);
		setEditingId(null);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const payload = {
				...formData,
				capacity: Number(formData.capacity),
			};

			if (editingId) {
				await updateFacility(editingId, payload);
			} else {
				await createFacility(payload);
			}

			resetForm();
			loadFacilities();
		} catch (err) {
			console.error(err);
			setError('Failed to save facility');
		}
	};

	const handleEdit = (facility) => {
		setEditingId(facility.id);
		setFormData({
			name: facility.name || '',
			type: facility.type || '',
			capacity: facility.capacity || '',
			location: facility.location || '',
			status: facility.status || '',
			availableFrom: facility.availableFrom || '',
			availableTo: facility.availableTo || '',
			description: facility.description || '',
		});
	};

	const handleDelete = async (id) => {
		const confirmDelete = window.confirm(
			'Are you sure you want to delete this facility?',
		);
		if (!confirmDelete) return;

		try {
			await deleteFacility(id);
			if (editingId === id) {
				resetForm();
			}
			loadFacilities();
		} catch (err) {
			console.error(err);
			setError('Failed to delete facility');
		}
	};

	const filteredFacilities = facilities.filter((facility) =>
		facility.name.toLowerCase().includes(search.toLowerCase()),
	);

	return (
		<div className='app-container'>
			<h1 className='main-title'>Facilities Management</h1>

			{error && <p className='error-text'>{error}</p>}

			<FacilityForm
				formData={formData}
				editingId={editingId}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				resetForm={resetForm}
			/>

			<div className='card'>
				<h2 className='section-title'>Search Facility</h2>
				<input
					type='text'
					placeholder='Search by facility name'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className='search-input'
				/>
			</div>

			<FacilityTable
				facilities={filteredFacilities}
				handleEdit={handleEdit}
				handleDelete={handleDelete}
			/>
		</div>
	);
}

export default App;
