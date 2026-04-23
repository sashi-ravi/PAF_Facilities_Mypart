import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import AddFacilityPage from './pages/AddFacilityPage';
import FacilityListPage from './pages/FacilityListPage';
import sliitLogo from './assets/SLIIT.png';

function App() {
	return (
		<div className='courseweb-layout'>
			<header className='top-header'>
				<div className='top-header-inner'>
					<img
						src={sliitLogo}
						alt='SLIIT Logo'
						className='sliit-logo'
					/>
				</div>
			</header>

			<nav className='courseweb-navbar'>
				<div className='courseweb-nav-inner'>
					<Link to='/'>Add Facility</Link>
					<Link to='/facilities'>Facilities List</Link>
				</div>
			</nav>

			<main className='main-content'>
				<Routes>
					<Route
						path='/'
						element={<AddFacilityPage />}
					/>
					<Route
						path='/facilities'
						element={<FacilityListPage />}
					/>
				</Routes>
			</main>
		</div>
	);
}

export default App;
