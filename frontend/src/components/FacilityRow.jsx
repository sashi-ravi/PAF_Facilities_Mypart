function FacilityRow({ facility, handleEdit, handleDelete }) {
	const formatTime12Hour = (time24) => {
		if (!time24) return 'N/A';

		const [hourStr, minute] = time24.split(':');
		let hour = parseInt(hourStr, 10);
		const ampm = hour >= 12 ? 'PM' : 'AM';
		hour = hour % 12 || 12;

		return `${String(hour).padStart(2, '0')}:${minute} ${ampm}`;
	};

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
				{facility.status === 'OUT_OF_SERVICE'
					? 'N/A'
					: formatTime12Hour(facility.availableFrom)}
			</td>
			<td>
				{facility.status === 'OUT_OF_SERVICE'
					? 'N/A'
					: formatTime12Hour(facility.availableTo)}
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
