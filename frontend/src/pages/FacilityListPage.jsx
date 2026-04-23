import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FacilityTable from '../components/FacilityTable';
import { deleteFacility, getAllFacilities } from '../services/facilityService';

function FacilityListPage() {
	const [facilities, setFacilities] = useState([]);
	const [error, setError] = useState('');
	const [search, setSearch] = useState('');
	const [typeFilter, setTypeFilter] = useState('');
	const [statusFilter, setStatusFilter] = useState('');
	const [locationFilter, setLocationFilter] = useState('');
	const [capacityFilter, setCapacityFilter] = useState('');

	const navigate = useNavigate();

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

	const handleDelete = async (id) => {
		const confirmDelete = window.confirm(
			'Are you sure you want to delete this resource?',
		);
		if (!confirmDelete) return;

		try {
			await deleteFacility(id);
			loadFacilities();
		} catch (err) {
			console.error(err);
			setError('Failed to delete resource');
		}
	};

	const handleEdit = (facility) => {
		navigate('/', { state: { facility } });
	};

	const filteredFacilities = facilities.filter((facility) => {
		const matchesSearch = facility.name
			?.toLowerCase()
			.includes(search.toLowerCase());

		const matchesType = typeFilter ? facility.type === typeFilter : true;
		const matchesStatus = statusFilter
			? facility.status === statusFilter
			: true;
		const matchesLocation = locationFilter
			? facility.location?.toLowerCase().includes(locationFilter.toLowerCase())
			: true;
		const matchesCapacity = capacityFilter
			? Number(facility.capacity) >= Number(capacityFilter)
			: true;

		return (
			matchesSearch &&
			matchesType &&
			matchesStatus &&
			matchesLocation &&
			matchesCapacity
		);
	});

	const clearFilters = () => {
		setSearch('');
		setTypeFilter('');
		setStatusFilter('');
		setLocationFilter('');
		setCapacityFilter('');
	};

	return (
		<div className='page-wrapper'>
			<div className='title-card'>
				<h1 className='page-heading'>Facilities List</h1>
				<p className='page-description'>
					View, search, and filter all facilities and equipment in the system.
				</p>
			</div>

			{error && <p className='error-text'>{error}</p>}

			<div className='filter-card'>
				<h2 className='filter-title'>Search and Filter</h2>

				<div className='filter-grid'>
					<input
						type='text'
						placeholder='Search by resource name'
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className='filter-input'
					/>

					<select
						value={typeFilter}
						onChange={(e) => setTypeFilter(e.target.value)}
						className='filter-input'>
						<option value=''>All Types</option>
						<option value='LAB'>LAB</option>
						<option value='HALL'>HALL</option>
						<option value='ROOM'>ROOM</option>
						<option value='PROJECTOR'>PROJECTOR</option>
						<option value='CAMERA'>CAMERA</option>
						<option value='MICROPHONE'>MICROPHONE</option>
						<option value='LAPTOP'>LAPTOP</option>
					</select>

					<select
						value={statusFilter}
						onChange={(e) => setStatusFilter(e.target.value)}
						className='filter-input'>
						<option value=''>All Status</option>
						<option value='ACTIVE'>ACTIVE</option>
						<option value='OUT_OF_SERVICE'>OUT OF SERVICE</option>
					</select>

					<input
						type='text'
						placeholder='Filter by location'
						value={locationFilter}
						onChange={(e) => setLocationFilter(e.target.value)}
						className='filter-input'
					/>

					<input
						type='number'
						placeholder='Minimum capacity'
						value={capacityFilter}
						onChange={(e) => setCapacityFilter(e.target.value)}
						className='filter-input'
					/>

					<button
						className='clear-btn'
						onClick={clearFilters}>
						Clear Filters
					</button>
				</div>
			</div>

			<FacilityTable
				facilities={filteredFacilities}
				handleEdit={handleEdit}
				handleDelete={handleDelete}
			/>
		</div>
	);
}

export default FacilityListPage;
