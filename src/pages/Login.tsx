import * as React from 'react';
import { useNavigate} from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { loginUser } from '../api/auth';
import { useAuthForm } from '../hooks/useAuthForm';

export const Login = () => {
	const {
		email,
		setEmail,
		password,
		setPassword,
		emailError,
		passwordError,
		isLoading,
		setIsLoading,
		generalError,
		setGeneralError,
		validateForm,
		resetErrors
	} = useAuthForm();

	const navigate = useNavigate();
	const login = useAuthStore((state) => state.login);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setIsLoading(true); // Включаємо стан завантаження
		setGeneralError(null); // Очищаємо попередні помилки

		try {
			// Відправляємо дані на бекенд
			const { user, token } = await loginUser({ email, password });

			// Зберігаємо токен (якщо він потрібен для подальших запитів)
			localStorage.setItem('token', token);

			// Логін у глобальний стан (zustand)
			login(user);

			// Перехід на головну
			navigate('/');
		}	catch (error: any) {
			// Обробка помилки від бекенду
			setGeneralError(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleLogin} style={{ maxWidth: '400px', margin: 'auto' }}>
			<h2 style={{color: 'red'}}>Вхід</h2>

			<label htmlFor="email">Email:</label>
			<input
				id="email"
				type="email"
				value={email}
				onChange={(e) => {
					setEmail(e.target.value);
					resetErrors();
				}}
				placeholder="Email"
				required
			/>
			{emailError && <div style={{ color: 'red', fontSize: '12px' }}>{emailError}</div>}

			<label htmlFor="password">Пароль</label>
			<input
				id="password"
				type="password"
				value={password}
				onChange={(e) => {
					setPassword(e.target.value);
					resetErrors();
				}}
				placeholder="Password"
				required
			/>
			{passwordError && <div style={{ color: 'red', fontSize: '12px' }}>{passwordError}</div>}

			{generalError && <div style={{ color: 'red', fontSize: '12px' }}>{generalError}</div>}

			<button
				type="submit"
				style={{ marginTop: '1rem' }}
				disabled={isLoading} // Відключаємо кнопку під час завантаження
			>
				{isLoading ? 'Завантаження...' : 'Вхід'}
			</button>
		</form>
	);
};
