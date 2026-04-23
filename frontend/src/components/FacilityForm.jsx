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

				<input
					type='text'
					name='location'
					placeholder='Location / Storage Room'
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
						type='text'
						name='availableFrom'
						placeholder='08:00 AM'
						value={formData.availableFrom}
						onChange={handleChange}
						disabled={formData.status === 'OUT_OF_SERVICE'}
						required={formData.status !== 'OUT_OF_SERVICE'}
					/>
				</div>

				<div className='input-group'>
					<label>Available To</label>
					<input
						type='text'
						name='availableTo'
						placeholder='05:00 PM'
						value={formData.availableTo}
						onChange={handleChange}
						disabled={formData.status === 'OUT_OF_SERVICE'}
						required={formData.status !== 'OUT_OF_SERVICE'}
					/>
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
