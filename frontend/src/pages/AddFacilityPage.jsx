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
		if (!time24) {
			return { hour: '', minute: '', period: '' };
		}

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
				name: facility.name || '',
				type: facility.type || '',
				capacity: facility.capacity || '',
				location: facility.location || '',
				status: facility.status || '',
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

		let updatedForm = {
			...formData,
			[name]: value,
		};

		if (name === 'status' && value === 'OUT_OF_SERVICE') {
			updatedForm.availableFromHour = '';
			updatedForm.availableFromMinute = '';
			updatedForm.availableFromPeriod = '';
			updatedForm.availableToHour = '';
			updatedForm.availableToMinute = '';
			updatedForm.availableToPeriod = '';
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

		if (!formData.location) {
			setError('Please select a location');
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

		let availableFrom = '';
		let availableTo = '';

		if (formData.status !== 'OUT_OF_SERVICE') {
			if (
				!formData.availableFromHour ||
				!formData.availableFromMinute ||
				!formData.availableFromPeriod
			) {
				setError('Please select full Available From time');
				return;
			}

			if (
				!formData.availableToHour ||
				!formData.availableToMinute ||
				!formData.availableToPeriod
			) {
				setError('Please select full Available To time');
				return;
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

		try {
			const payload = {
				name: formData.name,
				type: formData.type.toUpperCase(),
				capacity: Number(formData.capacity),
				location: formData.location,
				status: formData.status.toUpperCase(),
				availableFrom,
				availableTo,
				description: formData.description,
			};

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
		<div className='page-wrapper'>
			<div className='title-card'>
				<h1 className='page-heading'>
					{editingId ? 'Update Resource' : 'Facilities & Assets Management'}
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
