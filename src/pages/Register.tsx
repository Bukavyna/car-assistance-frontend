import * as React from 'react';
import { useNavigate  } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { registerUser } from '../api/auth';
import { useAuthForm } from '../hooks/useAuthForm';

export const Register = () => {
	const {
		email,
		setEmail,
		password,
		setPassword,
		repeatPassword,
		setRepeatPassword,
		firstName,
		setFirstName,
		lastName,
		setLastName,
		emailError,
		passwordError,
		repeatPasswordError,
		firstNameError,
		lastNameError,
		isLoading,
		setIsLoading,
		generalError,
		setGeneralError,
		validateForm,
		resetError
	} = useAuthForm();

	const navigate = useNavigate();
	const login = useAuthStore((state) => state.login);

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setIsLoading(true); // Включаємо стан завантаження
		setGeneralError(null); // Очищаємо попередні помилки

		try {
			// Відправляємо дані на бекенд
			const { user, token } = await registerUser({ email, password });

			// Зберігаємо токен (якщо він потрібен для подальших запитів)
			localStorage.setItem('token', token);

			// Логін у глобальний стан (zustand)
			login(user);

			// Перехід на головну
			navigate('/');
		} catch (error: any) {
			// Обробка помилки від бекенду
			setGeneralError(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleRegister} style={{ maxWidth: '300px', margin: 'auto' }}>
			<h2 style={{color: 'red'}}>Реєстрація</h2>

			<label style={{ color: 'black', fontSize: '16px', display: 'flex', flexDirection: 'column' }}  htmlFor="email">
				<span style={{ marginRight: 'auto' }}>Пошта:</span>
				<input
					id="email"
					type="email"
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
						resetError();
					}}
					placeholder="Email"
					required
				/>
			</label>

			{emailError && <div style={{ color: 'red', fontSize: '12px' }}>{emailError}</div>}

			<label style={{ color: 'black', fontSize: '16px', display: 'flex', flexDirection: 'column' }}  htmlFor="password">
				<span style={{ marginRight: 'auto' }}>Пароль:</span>
				<input
					id="password"
					type="password"
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
						resetError();
					}}
					placeholder="Password"
					required
				/>
			</label>
			{passwordError && <div style={{ color: 'red', fontSize: '12px' }}>{passwordError}</div>}

			<label style={{ color: 'black', fontSize: '16px', display: 'flex', flexDirection: 'column' }} htmlFor="repeatPassword">
				<span style={{ marginRight: 'auto' }}>Підтвердити пароль:</span>
				<input
					id="repeatPassword"
					type="password"
					value={repeatPassword}
					onChange={(e) => {
						setRepeatPassword(e.target.value);
						resetError();
					}}
					placeholder="Repeat Password"
					required
				/>
			</label>
			{repeatPasswordError  && <div style={{ color: 'red', fontSize: '12px' }}>{repeatPasswordError}</div>}

			<label style={{ color: 'black', fontSize: '16px', display: 'flex', flexDirection: 'column' }} htmlFor="firstName">
				<span style={{ marginRight: 'auto' }}>Ім'я:</span>
				<input
					id="firstName"
					type="text"
					name="name"
					value={firstName}
					onChange={(e) => {
						setFirstName(e.target.value);
						resetError();
					}}
					placeholder="First Name"
					required
				/>
			</label>
			{firstNameError && <div style={{ color: 'red', fontSize: '12px' }}>{firstNameError}</div>}

			<label style={{ color: 'black', fontSize: '16px', display: 'flex', flexDirection: 'column' }} htmlFor="lastName">
				<span style={{ marginRight: 'auto' }}>Прізвище:</span>
				<input
					id="lastName"
					type="text"
					name="name"
					value={lastName}
					onChange={(e) => {
						setLastName(e.target.value);
						resetError();
					}}
					placeholder="Last Name"
					required
				/>
			</label>
			{lastNameError && <div style={{ color: 'red', fontSize: '12px' }}>{lastNameError}</div>}

			{generalError && <div style={{ color: 'red', fontSize: '12px' }}>{generalError}</div>}

			<button
				type="submit"
				style={{ marginTop: '1rem' }}
				disabled={isLoading} // Відключаємо кнопку під час завантаження
			>
				{isLoading ? 'Завантаження...' : 'Зареєструватися'}
			</button>
		</form>
	);
};
