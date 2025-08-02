import './App.css'

import { Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import { CarsPage } from './pages/CarsPage';
import { Home } from './pages/Home';

function App() {
  return (
		<>
			<nav>
				<Link to="/">Головна</Link> | <Link to="/register">Реєстрація</Link> | <Link to="/login">Вхід</Link>
			</nav>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />

				<Route
					path="/"
					element={
					  <ProtectedRoute>
						  {/*<CarsPage />*/}
					  </ProtectedRoute>
					}
				/>
			</Routes>
		</>
  );
}

export default App
