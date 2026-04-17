import { useEffect, useState } from 'react';

function App() {
	const [facilities, setFacilities] = useState([]);
	const [error, setError] = useState('');

	useEffect(() => {
		fetch('http://localhost:8080/api/facilities')
			.then((response) => {
				if (!response.ok) {
					throw new Error('Failed to fetch facilities');
				}
				return response.json();
			})
			.then((data) => {
				setFacilities(data);
			})
			.catch((err) => {
				console.error(err);
				setError('Backend connection failed');
			});
	}, []);

	return (
		<div style={{ padding: '20px' }}>
			<h1>Facilities List</h1>

			{error && <p>{error}</p>}

			<ul>
				{facilities.map((facility, index) => (
					<li key={index}>{facility}</li>
				))}
			</ul>
		</div>
	);
}

export default App;
