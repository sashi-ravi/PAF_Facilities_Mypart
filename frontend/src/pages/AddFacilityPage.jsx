import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createFacility, updateFacility } from '../services/facilityService';
import FacilityForm from '../components/FacilityForm';

function AddFacilityPage() {
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

	const [formData, setFormData] = useState(initialFormState);
	const [editingId, setEditingId] = useState(null);
	const [error, setError] = useState('');

	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (location.state?.facility) {
			const facility = location.state.facility;

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
		}
	}, [location.state]);

	const handleChange = (e) => {
		const { name, value } = e.target;

		let updatedForm = {
			...formData,
			[name]: value,
		};

		if (name === 'status' && value === 'OUT_OF_SERVICE') {
			updatedForm.availableFrom = '';
			updatedForm.availableTo = '';
		}

		setFormData(updatedForm);
		setError('');
	};

	const resetForm = () => {
		setFormData(initialFormState);
		setEditingId(null);
		navigate('/', { replace: true });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!formData.name.trim()) {
			setError('Resource name is required');
			return;
		}

		if (!formData.type) {
			setError('Please select a resource type');
			return;
		}

		if (!formData.capacity || Number(formData.capacity) <= 0) {
			setError('Capacity must be greater than 0');
			return;
		}

		if (!formData.location.trim()) {
			setError('Location is required');
			return;
		}

		if (!formData.status) {
			setError('Please select a status');
			return;
		}

		if (formData.status !== 'OUT_OF_SERVICE' && !formData.availableFrom) {
			setError('Available from time is required');
			return;
		}

		if (formData.status !== 'OUT_OF_SERVICE' && !formData.availableTo) {
			setError('Available to time is required');
			return;
		}

		if (!formData.description.trim()) {
			setError('Description is required');
			return;
		}

		try {
			const payload = {
				...formData,
				type: formData.type.toUpperCase(),
				status: formData.status.toUpperCase(),
				capacity: Number(formData.capacity),
				availableFrom:
					formData.status === 'OUT_OF_SERVICE' ? '' : formData.availableFrom,
				availableTo:
					formData.status === 'OUT_OF_SERVICE' ? '' : formData.availableTo,
			};

			if (editingId) {
				await updateFacility(editingId, payload);
				alert('Resource updated successfully');
			} else {
				await createFacility(payload);
				alert('Resource saved successfully');
			}

			resetForm();
		} catch (err) {
			console.error(err);
			setError('Failed to save resource');
		}
	};

	return (
		<div className='page-wrapper'>
			<div className='title-card'>
				<h1 className='page-heading'>
					{editingId
						? 'Update Resource'
						: 'IT3030 - Facilities & Assets Management'}
				</h1>
				<p className='page-description'>
					{editingId
						? 'Update the selected facility or equipment.'
						: 'Add and manage campus facilities and equipment for the smart campus system.'}
				</p>
			</div>

			{error && <p className='error-text'>{error}</p>}

			<FacilityForm
				formData={formData}
				editingId={editingId}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				resetForm={resetForm}
			/>
		</div>
	);
}

export default AddFacilityPage;
