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

	const convert24To12Hour = (time24) => {
		if (!time24) return '';
		const [hourStr, minute] = time24.split(':');
		let hour = parseInt(hourStr, 10);
		const ampm = hour >= 12 ? 'PM' : 'AM';
		hour = hour % 12 || 12;
		return `${String(hour).padStart(2, '0')}:${minute} ${ampm}`;
	};

	const convert12To24Hour = (time12) => {
		if (!time12) return '';

		const match = time12.trim().match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i);
		if (!match) return null;

		let hour = parseInt(match[1], 10);
		const minute = match[2];
		const ampm = match[3].toUpperCase();

		if (hour < 1 || hour > 12) return null;

		if (ampm === 'AM') {
			if (hour === 12) hour = 0;
		} else {
			if (hour !== 12) hour += 12;
		}

		return `${String(hour).padStart(2, '0')}:${minute}`;
	};

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
				availableFrom: facility.availableFrom
					? convert24To12Hour(facility.availableFrom)
					: '',
				availableTo: facility.availableTo
					? convert24To12Hour(facility.availableTo)
					: '',
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

		if (!formData.description.trim()) {
			setError('Description is required');
			return;
		}

		let availableFrom24 = '';
		let availableTo24 = '';

		if (formData.status !== 'OUT_OF_SERVICE') {
			if (!formData.availableFrom.trim()) {
				setError('Available from time is required');
				return;
			}

			if (!formData.availableTo.trim()) {
				setError('Available to time is required');
				return;
			}

			availableFrom24 = convert12To24Hour(formData.availableFrom);
			availableTo24 = convert12To24Hour(formData.availableTo);

			if (!availableFrom24 || !availableTo24) {
				setError('Please enter time in format HH:MM AM/PM');
				return;
			}
		}

		try {
			const payload = {
				...formData,
				type: formData.type.toUpperCase(),
				status: formData.status.toUpperCase(),
				capacity: Number(formData.capacity),
				availableFrom:
					formData.status === 'OUT_OF_SERVICE' ? '' : availableFrom24,
				availableTo: formData.status === 'OUT_OF_SERVICE' ? '' : availableTo24,
			};

			if (editingId) {
				await updateFacility(editingId, payload);
				navigate('/facilities');
			} else {
				await createFacility(payload);
				navigate('/facilities');
			}
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
