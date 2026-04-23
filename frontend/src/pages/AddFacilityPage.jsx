import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FacilityForm from '../components/FacilityForm';
import { createFacility, updateFacility } from '../services/facilityService';

function AddFacilityPage() {
	const initialFormState = {
		code: '',
		name: '',
		type: '',
		capacity: '',
		location: '',
		status: '',
		category: '',
		availableFromHour: '',
		availableFromMinute: '',
		availableFromPeriod: '',
		availableToHour: '',
		availableToMinute: '',
		availableToPeriod: '',
		description: '',
	};

	const [formData, setFormData] = useState(initialFormState);
	const [editingId, setEditingId] = useState(null);
	const [error, setError] = useState('');

	const location = useLocation();
	const navigate = useNavigate();

	const convert24To12Parts = (time24) => {
		if (!time24) return { hour: '', minute: '', period: '' };

		const [hourStr, minute] = time24.split(':');
		let hour = parseInt(hourStr, 10);
		const period = hour >= 12 ? 'PM' : 'AM';
		hour = hour % 12 || 12;

		return {
			hour: String(hour).padStart(2, '0'),
			minute,
			period,
		};
	};

	const convert12PartsTo24 = (hour, minute, period) => {
		if (!hour || !minute || !period) return '';

		let h = parseInt(hour, 10);

		if (period === 'AM') {
			if (h === 12) h = 0;
		} else {
			if (h !== 12) h += 12;
		}

		return `${String(h).padStart(2, '0')}:${minute}`;
	};

	useEffect(() => {
		if (location.state?.facility) {
			const facility = location.state.facility;
			const fromParts = convert24To12Parts(facility.availableFrom);
			const toParts = convert24To12Parts(facility.availableTo);

			setEditingId(facility.id);
			setFormData({
				code: facility.code || '',
				name: facility.name || '',
				type: facility.type || '',
				capacity: facility.capacity || '',
				location: facility.location || '',
				status: facility.status || '',
				category: facility.category || '',
				availableFromHour: fromParts.hour,
				availableFromMinute: fromParts.minute,
				availableFromPeriod: fromParts.period,
				availableToHour: toParts.hour,
				availableToMinute: toParts.minute,
				availableToPeriod: toParts.period,
				description: facility.description || '',
			});
		}
	}, [location.state]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		const updated = { ...formData, [name]: value };

		if (name === 'status' && value === 'OUT_OF_SERVICE') {
			updated.availableFromHour = '';
			updated.availableFromMinute = '';
			updated.availableFromPeriod = '';
			updated.availableToHour = '';
			updated.availableToMinute = '';
			updated.availableToPeriod = '';
		}

		setFormData(updated);
		setError('');
	};

	const resetForm = () => {
		setFormData(initialFormState);
		setEditingId(null);
		navigate('/', { replace: true });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!formData.code.trim()) return setError('Code is required');
		if (!formData.name.trim()) return setError('Name is required');
		if (!formData.type) return setError('Type is required');
		if (!formData.capacity || Number(formData.capacity) <= 0) {
			return setError('Capacity must be greater than 0');
		}
		if (!formData.location) return setError('Location is required');
		if (!formData.status) return setError('Status is required');
		if (!formData.category) return setError('Category is required');
		if (!formData.description.trim())
			return setError('Description is required');

		let availableFrom = '';
		let availableTo = '';

		if (formData.status !== 'OUT_OF_SERVICE') {
			if (
				!formData.availableFromHour ||
				!formData.availableFromMinute ||
				!formData.availableFromPeriod
			) {
				return setError('Available From time is required');
			}

			if (
				!formData.availableToHour ||
				!formData.availableToMinute ||
				!formData.availableToPeriod
			) {
				return setError('Available To time is required');
			}

			availableFrom = convert12PartsTo24(
				formData.availableFromHour,
				formData.availableFromMinute,
				formData.availableFromPeriod,
			);

			availableTo = convert12PartsTo24(
				formData.availableToHour,
				formData.availableToMinute,
				formData.availableToPeriod,
			);
		}

		const payload = {
			code: formData.code,
			name: formData.name,
			type: formData.type,
			capacity: Number(formData.capacity),
			location: formData.location,
			status: formData.status,
			availableFrom,
			availableTo,
			category: formData.category,
			description: formData.description,
		};

		try {
			if (editingId) {
				await updateFacility(editingId, payload);
			} else {
				await createFacility(payload);
			}

			navigate('/facilities');
		} catch (err) {
			console.error(err);
			setError('Failed to save resource');
		}
	};

	return (
		<div className='page-shell'>
			<div className='page-card'>
				<h2 className='page-title'> SMART CAMPUS</h2>
				<p className='page-subtitle'>Facilities & Assets Management</p>
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
