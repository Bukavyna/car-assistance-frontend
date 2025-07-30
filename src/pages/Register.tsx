import * as React from 'react';
import { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const Register = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const navigate =useNavigate();
	const login = useAuthStore((state) => state.login);

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!email) {
			alert('Заповніть всі поля');
			return;
		}

		if (!password) {
			alert('Заповніть всі поля');
		}

		const newUser = {
			id: Date.now().toString(),
			email,
		};

		// Симуляція збереження користувача в localStorage
		localStorage.setItem('user', JSON.stringify(newUser));

		// Логін у глобальний стан
		login(newUser);

		// Перехід на головну
		navigate('/');
	}

	return (
		<form onSubmit={handleRegister} style={{ maxWidth: '400px', margin: 'auto' }}>
			<h2 style={{color: 'red'}}>Реєстрація</h2>

			<label htmlFor="email">Email:</label>
			<input
				id="email"
				type="email"
				value={email}
				onChange={(e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
				placeholder="Email"
				required
			/>

			<label htmlFor="password">Пароль</label>
			<input
				id="password"
				type="password"
				value={password}
				onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
				placeholder="Password"
			/>

			<button
				type="submit"
				style={{ marginTop: '1rem' }}
			>
				Зареєструватися
			</button>
		</form>
	)
};
