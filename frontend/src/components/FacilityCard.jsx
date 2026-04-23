function FacilityCard({ facility, handleEdit, handleDelete }) {
	const formatTime12Hour = (time24) => {
		if (!time24) return 'N/A';
		const [hourStr, minute] = time24.split(':');
		let hour = parseInt(hourStr, 10);
		const ampm = hour >= 12 ? 'PM' : 'AM';
		hour = hour % 12 || 12;
		return `${String(hour).padStart(2, '0')}:${minute} ${ampm}`;
	};

	const getIcon = (type) => {
		switch (type) {
			case 'LAB':
				return '🧪';
			case 'HALL':
				return '🏛️';
			case 'ROOM':
				return '📘';
			default:
				return '⚙️';
		}
	};

	return (
		<div className='facility-modern-card'>
			<div className='facility-modern-top'>
				<div className='facility-modern-left'>
					<div className='facility-modern-icon'>{getIcon(facility.type)}</div>

					<div className='facility-modern-main'>
						<h3>{facility.name}</h3>
						<p>
							{facility.code} •{' '}
							{facility.type === 'LAB'
								? 'Lab'
								: facility.type === 'HALL'
									? 'Hall'
									: facility.type}
						</p>
					</div>
				</div>

				<div>
					<span
						className={
							facility.status === 'ACTIVE'
								? 'modern-status active'
								: 'modern-status inactive'
						}>
						{facility.status === 'ACTIVE' ? 'Active' : 'Out of Service'}
					</span>
				</div>
			</div>

			<div className='facility-modern-meta'>
				<div className='meta-box'>📍 {facility.location}</div>
				<div className='meta-box'>👥 {facility.capacity} seats</div>
			</div>

			<div className='facility-modern-footer'>
				<div className='facility-modern-category'>🔧 {facility.category}</div>

				<div className='facility-modern-times'>
					{facility.status === 'OUT_OF_SERVICE'
						? 'Unavailable'
						: `${formatTime12Hour(facility.availableFrom)} - ${formatTime12Hour(facility.availableTo)}`}
				</div>

				<div className='facility-modern-actions'>
					<button
						className='btn-edit-modern'
						onClick={() => handleEdit(facility)}>
						Edit
					</button>
					<button
						className='btn-delete-modern'
						onClick={() => handleDelete(facility.id)}>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}

export default FacilityCard;
