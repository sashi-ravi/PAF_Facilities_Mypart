import { useEffect, useMemo, useState } from 'react';
import FacilityTable from '../components/FacilityTable';
import { deleteFacility, getAllFacilities } from '../services/facilityService';
import { useNavigate } from 'react-router-dom';

function FacilityListPage() {
	const [facilities, setFacilities] = useState([]);
	const [error, setError] = useState('');
	const [search, setSearch] = useState('');
	const [typeFilter, setTypeFilter] = useState('');
	const [statusFilter, setStatusFilter] = useState('');
	const [locationFilter, setLocationFilter] = useState('');
	const [capacityFilter, setCapacityFilter] = useState('');
	const [sortOption, setSortOption] = useState('');

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

	const filteredFacilities = useMemo(() => {
		let filtered = facilities.filter((facility) => {
			const matchesSearch = facility.name
				?.toLowerCase()
				.includes(search.toLowerCase());

			const matchesType = typeFilter ? facility.type === typeFilter : true;

			const matchesStatus = statusFilter
				? facility.status === statusFilter
				: true;

			const matchesLocation = locationFilter
				? facility.location
						?.toLowerCase()
						.includes(locationFilter.toLowerCase())
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

		if (sortOption === 'nameAsc') {
			filtered.sort((a, b) => a.name.localeCompare(b.name));
		} else if (sortOption === 'nameDesc') {
			filtered.sort((a, b) => b.name.localeCompare(a.name));
		} else if (sortOption === 'capacityAsc') {
			filtered.sort((a, b) => Number(a.capacity) - Number(b.capacity));
		} else if (sortOption === 'capacityDesc') {
			filtered.sort((a, b) => Number(b.capacity) - Number(a.capacity));
		} else if (sortOption === 'typeAsc') {
			filtered.sort((a, b) => a.type.localeCompare(b.type));
		}

		return filtered;
	}, [
		facilities,
		search,
		typeFilter,
		statusFilter,
		locationFilter,
		capacityFilter,
		sortOption,
	]);

	const summary = useMemo(() => {
		const totalResources = facilities.length;
		const activeResources = facilities.filter(
			(item) => item.status === 'ACTIVE',
		).length;
		const outOfServiceResources = facilities.filter(
			(item) => item.status === 'OUT_OF_SERVICE',
		).length;
		const labs = facilities.filter((item) => item.type === 'LAB').length;
		const halls = facilities.filter((item) => item.type === 'HALL').length;
		const equipment = facilities.filter((item) =>
			['PROJECTOR', 'CAMERA', 'MICROPHONE', 'LAPTOP'].includes(item.type),
		).length;

		return {
			totalResources,
			activeResources,
			outOfServiceResources,
			labs,
			halls,
			equipment,
		};
	}, [facilities]);

	const clearFilters = () => {
		setSearch('');
		setTypeFilter('');
		setStatusFilter('');
		setLocationFilter('');
		setCapacityFilter('');
		setSortOption('');
	};

	return (
		<div className='page-wrapper'>
			<div className='title-card'>
				<h1 className='page-heading'>Facilities List</h1>
				<p className='page-description'>
					View, search, filter, and sort all facilities and equipment in the
					system.
				</p>
			</div>

			{error && <p className='error-text'>{error}</p>}

			<div className='summary-grid'>
				<div className='summary-card'>
					<h3>Total Resources</h3>
					<p>{summary.totalResources}</p>
				</div>

				<div className='summary-card'>
					<h3>Active Resources</h3>
					<p>{summary.activeResources}</p>
				</div>

				<div className='summary-card'>
					<h3>Out of Service</h3>
					<p>{summary.outOfServiceResources}</p>
				</div>

				<div className='summary-card'>
					<h3>Labs</h3>
					<p>{summary.labs}</p>
				</div>

				<div className='summary-card'>
					<h3>Halls</h3>
					<p>{summary.halls}</p>
				</div>

				<div className='summary-card'>
					<h3>Equipment</h3>
					<p>{summary.equipment}</p>
				</div>
			</div>

			<div className='filter-card'>
				<h2 className='filter-title'>Search, Filter and Sort</h2>

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

					<select
						value={sortOption}
						onChange={(e) => setSortOption(e.target.value)}
						className='filter-input'>
						<option value=''>Sort By</option>
						<option value='nameAsc'>Name A-Z</option>
						<option value='nameDesc'>Name Z-A</option>
						<option value='capacityAsc'>Capacity Low-High</option>
						<option value='capacityDesc'>Capacity High-Low</option>
						<option value='typeAsc'>Type A-Z</option>
					</select>

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
