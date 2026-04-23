function FacilityForm({
	formData,
	editingId,
	handleChange,
	handleSubmit,
	resetForm,
}) {
	const locations = [
		'Main Building',
		'New Building',
		'A Block',
		'B Block',
		'C Block',
		'IT Building',
		'Media Unit',
		'Equipment Room',
		'Library',
	];

	const hours = [
		'01',
		'02',
		'03',
		'04',
		'05',
		'06',
		'07',
		'08',
		'09',
		'10',
		'11',
		'12',
	];

	const minutes = ['00', '15', '30', '45'];

	return (
		<div className='card'>
			<h2 className='section-title'>
				{editingId ? 'Update Resource' : 'Add Resource'}
			</h2>

			<form
				className='facility-form'
				onSubmit={handleSubmit}>
				<input
					type='text'
					name='name'
					placeholder='Resource Name'
					value={formData.name}
					onChange={handleChange}
					required
				/>

				<select
					name='type'
					value={formData.type}
					onChange={handleChange}
					required>
					<option value=''>Select Type</option>
					<option value='LAB'>LAB</option>
					<option value='HALL'>HALL</option>
					<option value='ROOM'>ROOM</option>
					<option value='PROJECTOR'>PROJECTOR</option>
					<option value='CAMERA'>CAMERA</option>
					<option value='MICROPHONE'>MICROPHONE</option>
					<option value='LAPTOP'>LAPTOP</option>
				</select>

				<input
					type='number'
					name='capacity'
					placeholder='Capacity / Units'
					value={formData.capacity}
					onChange={handleChange}
					required
				/>

				<select
					name='location'
					value={formData.location}
					onChange={handleChange}
					required>
					<option value=''>Select Location</option>
					{locations.map((loc) => (
						<option
							key={loc}
							value={loc}>
							{loc}
						</option>
					))}
				</select>

				<select
					name='status'
					value={formData.status}
					onChange={handleChange}
					required>
					<option value=''>Select Status</option>
					<option value='ACTIVE'>ACTIVE</option>
					<option value='OUT_OF_SERVICE'>OUT OF SERVICE</option>
				</select>

				<div className='time-group-wrapper'>
					<label>Available From</label>
					<div className='time-select-group'>
						<select
							name='availableFromHour'
							value={formData.availableFromHour}
							onChange={handleChange}
							disabled={formData.status === 'OUT_OF_SERVICE'}
							required={formData.status !== 'OUT_OF_SERVICE'}>
							<option value=''>HH</option>
							{hours.map((hour) => (
								<option
									key={hour}
									value={hour}>
									{hour}
								</option>
							))}
						</select>

						<select
							name='availableFromMinute'
							value={formData.availableFromMinute}
							onChange={handleChange}
							disabled={formData.status === 'OUT_OF_SERVICE'}
							required={formData.status !== 'OUT_OF_SERVICE'}>
							<option value=''>MM</option>
							{minutes.map((minute) => (
								<option
									key={minute}
									value={minute}>
									{minute}
								</option>
							))}
						</select>

						<select
							name='availableFromPeriod'
							value={formData.availableFromPeriod}
							onChange={handleChange}
							disabled={formData.status === 'OUT_OF_SERVICE'}
							required={formData.status !== 'OUT_OF_SERVICE'}>
							<option value=''>AM/PM</option>
							<option value='AM'>AM</option>
							<option value='PM'>PM</option>
						</select>
					</div>
				</div>

				<div className='time-group-wrapper'>
					<label>Available To</label>
					<div className='time-select-group'>
						<select
							name='availableToHour'
							value={formData.availableToHour}
							onChange={handleChange}
							disabled={formData.status === 'OUT_OF_SERVICE'}
							required={formData.status !== 'OUT_OF_SERVICE'}>
							<option value=''>HH</option>
							{hours.map((hour) => (
								<option
									key={hour}
									value={hour}>
									{hour}
								</option>
							))}
						</select>

						<select
							name='availableToMinute'
							value={formData.availableToMinute}
							onChange={handleChange}
							disabled={formData.status === 'OUT_OF_SERVICE'}
							required={formData.status !== 'OUT_OF_SERVICE'}>
							<option value=''>MM</option>
							{minutes.map((minute) => (
								<option
									key={minute}
									value={minute}>
									{minute}
								</option>
							))}
						</select>

						<select
							name='availableToPeriod'
							value={formData.availableToPeriod}
							onChange={handleChange}
							disabled={formData.status === 'OUT_OF_SERVICE'}
							required={formData.status !== 'OUT_OF_SERVICE'}>
							<option value=''>AM/PM</option>
							<option value='AM'>AM</option>
							<option value='PM'>PM</option>
						</select>
					</div>
				</div>

				<textarea
					name='description'
					placeholder='Description'
					value={formData.description}
					onChange={handleChange}
					required
					className='description-textarea'
				/>

				<div className='form-buttons'>
					<button
						className='btn btn-primary'
						type='submit'>
						{editingId ? 'Update Resource' : 'Add Resource'}
					</button>

					{editingId && (
						<button
							className='btn btn-secondary'
							type='button'
							onClick={resetForm}>
							Cancel
						</button>
					)}
				</div>
			</form>
		</div>
	);
}

export default FacilityForm;
