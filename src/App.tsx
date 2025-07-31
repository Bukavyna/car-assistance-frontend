import './App.css'

import { Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import { CarsPage } from './pages/CarsPage';

function App() {
  return (
		<>
			<nav>
				<Link to="/">Головна</Link> | <Link to="/register">Реєстрація</Link> | <Link to="/login">Login</Link>
			</nav>
			<Routes>
				<Route path="/" element={<h1 style={{color: 'red' }}>Car Assistance</h1>} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/cars" element={<CarsPage />} />
				<Route
					path="/"
					element={
					  <ProtectedRoute>
						  {/*<CarList />*/}
					  </ProtectedRoute>
					}
				/>
			</Routes>
		</>
  )
}

export default App
