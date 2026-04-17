function FacilityRow({ facility, handleEdit, handleDelete }) {
	return (
		<tr>
			<td>{facility.name}</td>
			<td>{facility.type}</td>
			<td>{facility.capacity}</td>
			<td>{facility.location}</td>
			<td>{facility.status}</td>
			<td>{facility.availableFrom}</td>
			<td>{facility.availableTo}</td>
			<td>{facility.description}</td>
			<td>
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
			</td>
		</tr>
	);
}

export default FacilityRow;
