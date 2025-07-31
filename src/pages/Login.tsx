import * as React from 'react';
import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { validateField } from '../utils/validation';
import { loginUser } from '../api/auth';

export const Login = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [emailError, setEmailError] = useState<string | null>(null);
	const [passwordError, setPasswordError] = useState<string | null>(null);
	const navigate = useNavigate();
	const login = useAuthStore((state) => state.login);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [generalError, setGeneralError] = useState<string | null>(null);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();

		// Використовуємо функцію валідації
		const newEmailError = validateField({ type: 'email', value: email, required: true } as HTMLInputElement);
		const newPasswordError = validateField({ type: 'password', value: password, required: true } as HTMLInputElement);


		// Оновлюємо стан помилок
		setEmail(newEmailError);
		setPassword(newPasswordError);

		// Перевіряємо, чи немає помилок валідації
		if (newEmailError || newPasswordError) {
			// Якщо є помилки, зупиняємо виконання функції
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
				onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
					setEmail(e.target.value);
					setEmailError(null);
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
				onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
					setPassword(e.target.value);
					setPasswordError(null);
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
