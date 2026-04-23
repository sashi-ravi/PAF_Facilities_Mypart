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
		'Tower B',
		'FabLab',
		'Auditorium',
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
		<div className='form-card'>
			<h3 className='form-title'>
				{editingId ? 'Update Resource' : 'Add Resource'}
			</h3>

			<form
				className='facility-form'
				onSubmit={handleSubmit}>
				{/* Row 1 */}
				<div className='input-group'>
					<label>Resource Code</label>
					<input
						name='code'
						placeholder='LAB-A1'
						value={formData.code}
						onChange={handleChange}
					/>
				</div>

				<div className='input-group'>
					<label>Resource Name</label>
					<input
						name='name'
						placeholder='Lab 1305'
						value={formData.name}
						onChange={handleChange}
					/>
				</div>

				{/* Row 2 */}
				<div className='input-group'>
					<label>Type</label>
					<select
						name='type'
						value={formData.type}
						onChange={handleChange}>
						<option value=''>Select Type</option>
						<option value='LAB'>LAB</option>
						<option value='HALL'>HALL</option>
						<option value='ROOM'>ROOM</option>
						<option value='PROJECTOR'>PROJECTOR</option>
					</select>
				</div>

				<div className='input-group'>
					<label>Capacity</label>
					<input
						type='number'
						name='capacity'
						placeholder='40'
						value={formData.capacity}
						onChange={handleChange}
					/>
				</div>

				{/* Row 3 */}
				<div className='input-group'>
					<label>Location</label>
					<select
						name='location'
						value={formData.location}
						onChange={handleChange}>
						<option value=''>Select Location</option>
						{locations.map((loc) => (
							<option key={loc}>{loc}</option>
						))}
					</select>
				</div>

				<div className='input-group'>
					<label>Status</label>
					<select
						name='status'
						value={formData.status}
						onChange={handleChange}>
						<option value=''>Select Status</option>
						<option value='ACTIVE'>ACTIVE</option>
						<option value='OUT_OF_SERVICE'>OUT OF SERVICE</option>
					</select>
				</div>

				{/* Row 4 */}
				<div className='input-group'>
					<label>Category</label>
					<select
						name='category'
						value={formData.category}
						onChange={handleChange}>
						<option value=''>Select Category</option>
						<option value='Academic'>Academic</option>
						<option value='Equipment'>Equipment</option>
						<option value='Service'>Service</option>
					</select>
				</div>

				{/* Time */}
				<div className='input-group'>
					<label>Available From</label>
					<div className='time-select-row'>
						<select
							name='availableFromHour'
							value={formData.availableFromHour}
							onChange={handleChange}>
							<option>HH</option>
							{hours.map((h) => (
								<option key={h}>{h}</option>
							))}
						</select>

						<select
							name='availableFromMinute'
							value={formData.availableFromMinute}
							onChange={handleChange}>
							<option>MM</option>
							{minutes.map((m) => (
								<option key={m}>{m}</option>
							))}
						</select>

						<select
							name='availableFromPeriod'
							value={formData.availableFromPeriod}
							onChange={handleChange}>
							<option>AM/PM</option>
							<option>AM</option>
							<option>PM</option>
						</select>
					</div>
				</div>

				<div className='input-group'>
					<label>Available To</label>
					<div className='time-select-row'>
						<select
							name='availableToHour'
							value={formData.availableToHour}
							onChange={handleChange}>
							<option>HH</option>
							{hours.map((h) => (
								<option key={h}>{h}</option>
							))}
						</select>

						<select
							name='availableToMinute'
							value={formData.availableToMinute}
							onChange={handleChange}>
							<option>MM</option>
							{minutes.map((m) => (
								<option key={m}>{m}</option>
							))}
						</select>

						<select
							name='availableToPeriod'
							value={formData.availableToPeriod}
							onChange={handleChange}>
							<option>AM/PM</option>
							<option>AM</option>
							<option>PM</option>
						</select>
					</div>
				</div>

				{/* Description */}
				<textarea
					name='description'
					placeholder='Description'
					value={formData.description}
					onChange={handleChange}
					className='form-textarea'
				/>

				{/* Buttons */}
				<div className='form-actions'>
					<button
						className='btn-primary'
						type='submit'>
						{editingId ? 'Update Resource' : 'Add Resource'}
					</button>

					{editingId && (
						<button
							className='btn-secondary'
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
