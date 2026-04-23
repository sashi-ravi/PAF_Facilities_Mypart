function FacilityRow({ facility, handleEdit, handleDelete }) {
	return (
		<tr>
			<td>{facility.name}</td>
			<td>{facility.type}</td>
			<td>{facility.capacity}</td>
			<td>{facility.location}</td>
			<td>
				<span
					className={
						facility.status === 'ACTIVE'
							? 'status-badge active'
							: 'status-badge inactive'
					}>
					{facility.status}
				</span>
			</td>
			<td>
				{facility.status === 'OUT_OF_SERVICE' ? 'N/A' : facility.availableFrom}
			</td>
			<td>
				{facility.status === 'OUT_OF_SERVICE' ? 'N/A' : facility.availableTo}
			</td>
			<td className='description-cell'>{facility.description}</td>
			<td>
				<div className='action-buttons'>
					<button
						className='btn btn-edit'
						onClick={() => handleEdit(facility)}>
						Edit
					</button>
					<button
						className='btn btn-delete'
						onClick={() => handleDelete(facility.id)}>
						Delete
					</button>
				</div>
			</td>
		</tr>
	);
}

export default FacilityRow;
