function FacilityForm({
	formData,
	editingId,
	handleChange,
	handleSubmit,
	resetForm,
}) {
	return (
		<div className='card'>
			<h2 className='section-title'>
				{editingId ? 'Update Facility' : 'Add Facility'}
			</h2>

			<form
				className='facility-form'
				onSubmit={handleSubmit}>
				<input
					type='text'
					name='name'
					placeholder='Facility Name'
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
				</select>

				<input
					type='number'
					name='capacity'
					placeholder='Capacity'
					value={formData.capacity}
					onChange={handleChange}
					required
				/>

				<input
					type='text'
					name='location'
					placeholder='Location'
					value={formData.location}
					onChange={handleChange}
					required
				/>

				<select
					name='status'
					value={formData.status}
					onChange={handleChange}
					required>
					<option value=''>Select Status</option>
					<option value='ACTIVE'>ACTIVE</option>
					<option value='OUT_OF_SERVICE'>OUT OF SERVICE</option>
				</select>

				<div className='input-group'>
					<label>Available From</label>
					<input
						type='time'
						name='availableFrom'
						value={formData.availableFrom}
						onChange={handleChange}
						required
					/>
				</div>

				<div className='input-group'>
					<label>Available To</label>
					<input
						type='time'
						name='availableTo'
						value={formData.availableTo}
						onChange={handleChange}
						required
					/>
				</div>

				<input
					type='text'
					name='description'
					placeholder='Description'
					value={formData.description}
					onChange={handleChange}
					required
				/>

				<div className='form-buttons'>
					<button
						className='btn btn-primary'
						type='submit'>
						{editingId ? 'Update Facility' : 'Add Facility'}
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
