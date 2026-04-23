import FacilityRow from './FacilityRow';

function FacilityTable({ facilities, handleEdit, handleDelete }) {
	return (
		<div className='card'>
			{facilities.length === 0 ? (
				<p className='empty-text'>No facilities found.</p>
			) : (
				<div className='table-wrapper'>
					<table className='facility-table'>
						<thead>
							<tr>
								<th>Name</th>
								<th>Type</th>
								<th>Capacity</th>
								<th>Location</th>
								<th>Status</th>
								<th>Available From</th>
								<th>Available To</th>
								<th>Description</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{facilities.map((facility) => (
								<FacilityRow
									key={facility.id}
									facility={facility}
									handleEdit={handleEdit}
									handleDelete={handleDelete}
								/>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}

export default FacilityTable;
