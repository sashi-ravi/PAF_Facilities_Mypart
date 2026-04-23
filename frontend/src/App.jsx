import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import AddFacilityPage from './pages/AddFacilityPage';
import FacilityListPage from './pages/FacilityListPage';
import sliitLogo from './assets/SLIIT.png';

function App() {
	return (
		<div className='fm-layout'>
			<header className='fm-top'>
				<div className='fm-top-inner'>
					<img
						src={sliitLogo}
						alt='SLIIT Logo'
						className='fm-logo'
					/>

					<div className='fm-brand-text'>
						<p className='fm-brand-small'>
							SRI LANKA INSTITUTE OF INFORMATION TECHNOLOGY
						</p>
						<h1 className='fm-brand-title'>
							SLIIT <span>Facilities</span> Manager
						</h1>
						<p className='fm-brand-tagline'>Discover Your Future</p>
					</div>
				</div>

				<nav className='fm-nav'>
					<Link
						to='/'
						className='fm-nav-link'>
						Add Facility
					</Link>
					<Link
						to='/facilities'
						className='fm-nav-link'>
						Facilities List
					</Link>
				</nav>
			</header>

			<main className='fm-main'>
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
