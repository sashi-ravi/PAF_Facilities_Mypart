import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FacilityCard from '../components/FacilityCard';
import { deleteFacility, getAllFacilities } from '../services/facilityService';

function FacilityListPage() {
	const [facilities, setFacilities] = useState([]);
	const [error, setError] = useState('');

	const [searchTerm, setSearchTerm] = useState('');
	const [typeFilter, setTypeFilter] = useState('');
	const [statusFilter, setStatusFilter] = useState('');
	const [sortOption, setSortOption] = useState('nameAsc');

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
		let data = [...facilities];

		data = data.filter((facility) => {
			const name = facility.name ? facility.name.toLowerCase() : '';
			const code = facility.code ? facility.code.toLowerCase() : '';
			const search = searchTerm.toLowerCase();

			const matchesSearch =
				!searchTerm || name.includes(search) || code.includes(search);

			const matchesType = !typeFilter || facility.type === typeFilter;
			const matchesStatus = !statusFilter || facility.status === statusFilter;

			return matchesSearch && matchesType && matchesStatus;
		});

		switch (sortOption) {
			case 'nameAsc':
				data.sort((a, b) => a.name.localeCompare(b.name));
				break;
			case 'nameDesc':
				data.sort((a, b) => b.name.localeCompare(a.name));
				break;
			case 'capacityAsc':
				data.sort((a, b) => a.capacity - b.capacity);
				break;
			case 'capacityDesc':
				data.sort((a, b) => b.capacity - a.capacity);
				break;
			default:
				break;
		}

		return data;
	}, [facilities, searchTerm, typeFilter, statusFilter, sortOption]);

	const summary = useMemo(() => {
		return {
			total: facilities.length,
			active: facilities.filter((f) => f.status === 'ACTIVE').length,
			outOfService: facilities.filter((f) => f.status === 'OUT_OF_SERVICE')
				.length,
			labs: facilities.filter((f) => f.type === 'LAB').length,
			halls: facilities.filter((f) => f.type === 'HALL').length,
			equipment: facilities.filter((f) =>
				['PROJECTOR', 'CAMERA', 'MICROPHONE', 'LAPTOP'].includes(f.type),
			).length,
		};
	}, [facilities]);

	const resetFilters = () => {
		setSearchTerm('');
		setTypeFilter('');
		setStatusFilter('');
		setSortOption('nameAsc');
	};

	return (
		<div className='cards-page'>
			<section className='hero-section'>
				<div className='hero-pill'>Live overview · Updated just now</div>

				<h2 className='hero-title'>Facilities List</h2>

				<p className='hero-subtitle'>
					View, search, filter, and sort all facilities and equipment in the
					system — in one beautiful place.
				</p>

				<div className='summary-grid-modern'>
					<div className='modern-summary-card'>
						<span>TOTAL RESOURCES</span>
						<strong>{summary.total}</strong>
					</div>

					<div className='modern-summary-card'>
						<span>ACTIVE</span>
						<strong>{summary.active}</strong>
					</div>

					<div className='modern-summary-card'>
						<span>OUT OF SERVICE</span>
						<strong>{summary.outOfService}</strong>
					</div>

					<div className='modern-summary-card'>
						<span>LABS</span>
						<strong>{summary.labs}</strong>
					</div>

					<div className='modern-summary-card'>
						<span>HALLS</span>
						<strong>{summary.halls}</strong>
					</div>

					<div className='modern-summary-card'>
						<span>EQUIPMENT</span>
						<strong>{summary.equipment}</strong>
					</div>
				</div>
			</section>

			<section className='search-panel'>
				<div className='search-panel-header'>
					<div>
						<h3>Search, Filter & Sort</h3>
						<p>Refine your view of facilities in real time.</p>
					</div>

					<button
						className='reset-link-btn'
						onClick={resetFilters}>
						Reset
					</button>
				</div>

				<div className='search-panel-grid'>
					<input
						type='text'
						placeholder='Search by name or code...'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>

					<select
						value={typeFilter}
						onChange={(e) => setTypeFilter(e.target.value)}>
						<option value=''>All Types</option>
						<option value='LAB'>Lab</option>
						<option value='HALL'>Hall</option>
						<option value='ROOM'>Room</option>
						<option value='PROJECTOR'>Projector</option>
						<option value='CAMERA'>Camera</option>
						<option value='MICROPHONE'>Microphone</option>
						<option value='LAPTOP'>Laptop</option>
					</select>

					<select
						value={statusFilter}
						onChange={(e) => setStatusFilter(e.target.value)}>
						<option value=''>All Status</option>
						<option value='ACTIVE'>Active</option>
						<option value='OUT_OF_SERVICE'>Out of Service</option>
					</select>

					<select
						value={sortOption}
						onChange={(e) => setSortOption(e.target.value)}>
						<option value='nameAsc'>Sort: Name (A-Z)</option>
						<option value='nameDesc'>Sort: Name (Z-A)</option>
						<option value='capacityAsc'>Sort: Capacity (Low-High)</option>
						<option value='capacityDesc'>Sort: Capacity (High-Low)</option>
					</select>
				</div>
			</section>

			<div className='results-row'>
				<h3>{filteredFacilities.length} results</h3>
				<p>
					Showing {filteredFacilities.length} of {facilities.length} facilities
				</p>
			</div>

			{error && <p className='error-text'>{error}</p>}

			<div className='facility-card-list'>
				{filteredFacilities.length > 0 ? (
					filteredFacilities.map((facility) => (
						<FacilityCard
							key={facility.id}
							facility={facility}
							handleEdit={handleEdit}
							handleDelete={handleDelete}
						/>
					))
				) : (
					<div className='page-card'>
						<h3 className='page-title'>No matching results</h3>
						<p className='page-subtitle'>
							Try changing the search text or filters.
						</p>
					</div>
				)}
			</div>
		</div>
	);
}

export default FacilityListPage;
