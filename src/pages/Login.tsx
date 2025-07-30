import * as React from 'react';
import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const Login = () => {
	const [email, setEmail] = useState<string>('');
	const navigate = useNavigate();
	const login = useAuthStore((state) => state.login);

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault();

		// Простий приклад — читаємо з localStorage
		const stored = localStorage.getItem('user');
		if (!stored) return alert('No user found');
		const user = JSON.parse(stored);

		if (user.email !== email) return alert('Wrong email');

		login(user);
		navigate('/');
	};

	return (
		<form onSubmit={handleLogin}>
			<h2 style={{color: 'red'}}>Login</h2>
			<input
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder="Email"
			/>
			<button
				type="submit"
				>
				Login
			</button>
		</form>
	)
}
