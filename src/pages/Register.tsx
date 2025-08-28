import * as React from 'react';
import { useNavigate  } from 'react-router-dom';
import { registerUser } from '../api/auth';
import { useAuthStore } from '../store/authStore';
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
			// 1️⃣ Реєстрація користувача
			// Відправляємо дані на бекенд
			const { user, token } = await registerUser({
				email,
				password,
				repeatPassword,
				firstName,
				lastName,
			});

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
		<form
			className="section"
			onSubmit={handleRegister}
		>
			<h2 className="title">Реєстрація</h2>

			<label className="forms-label" htmlFor="email">Ел. пошта:</label>
			<div className="field">
				<p className="control has-icons-left">
					<input
						className="input"
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
					<span className="icon is-small is-left">
						<i className="fas fa-envelope"></i>
					</span>
				</p>
			</div>
				{emailError && <div className="error-style">{emailError}</div>}

			<label className="forms-label" htmlFor="password">Пароль:</label>
				<div className="field">
					<p className="control has-icons-left">
						<input
							className="input"
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
						<span className="icon is-small is-left">
							<i className="fas fa-lock"></i>
						</span>
					</p>
				</div>
				{passwordError && <div className="error-style">{passwordError}</div>}

			<label className="forms-label" htmlFor="repeatPassword">Підтвердити пароль:</label>
			<div className="field">
				<p className="control has-icons-left">
					<input
						className="input"
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
					<span className="icon is-small is-left">
						<i className="fas fa-lock"></i>
					</span>
				</p>
			</div>
				{repeatPasswordError  && <div className="error-style">{repeatPasswordError}</div>}

			<label className="forms-label" htmlFor="firstName">Ім'я:</label>
				<div className="field">
					<p  className="control has-icons-left">
						<input
							className="input"
							id="firstName"
							type="text"
							name="firstName"
							value={firstName}
							onChange={(e) => {
								setFirstName(e.target.value);
								resetError();
							}}
							placeholder="First Name"
							required
						/>
						<span className="icon is-small is-left">
							<i className="fas fa-user"></i>
						</span>
					</p>
				</div>
				{firstNameError && <div className="error-style">{firstNameError}</div>}

			<label className="forms-label" htmlFor="lastName">Прізвище:</label>
			<div className="field">
				<p  className="control has-icons-left">
					<input
						className="input"
						id="lastName"
						type="text"
						name="lastName"
						value={lastName}
						onChange={(e) => {
							setLastName(e.target.value);
							resetError();
						}}
						placeholder="Last Name"
						required
					/>
					<span className="icon is-small is-left">
							<i className="fas fa-user"></i>
						</span>
				</p>
			</div>
			{lastNameError && <div className="error-style">{lastNameError}</div>}

			{generalError && <div className="error-style">{generalError}</div>}

			<button
				type="submit"
				className="button is-primary"
				// disabled
				disabled={isLoading} // Відключаємо кнопку під час завантаження
			>
				{isLoading ? 'Завантаження...' : 'Зареєструватися'}
			</button>
		</form>
	);
};
