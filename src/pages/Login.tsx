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
			if (error.response?.data?.message) {
				setGeneralError(error.response.data.message);
			} else {
				setGeneralError(error.message || "Сталася помилка при вході");
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form
			className="section"
			onSubmit={handleLogin}
		>
			<h2 className="title">Вхід</h2>

			<label className="forms-label" htmlFor="email-login">Ел. пошта:</label>
			<div className="field">
				<p className="control has-icons-left">
					<input
						className="input"
						id="email-login"
						name="email"
						type="email"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
							resetErrors();
						}}
						placeholder="Email"
						required
					/>
					<span className="icon is-small is-left">
						<i className="fas fa-envelope"></i>
					</span>
				</p>
			</div>
			{emailError && <p className="help is-danger">Не повна адреса</p>}

			<label className="forms-label" htmlFor="password-login">Пароль:</label>
			<div className="field">
				<p className="control has-icons-left">
					<input
						className="input"
						id="password-login"
						name="password"
						type="password"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
							resetErrors();
						}}
						placeholder="Password"
						required
					/>
          <span className="icon is-small is-left">
            <i className="fas fa-lock"></i>
          </span>
				</p>
			</div>
			{passwordError && <p className="help is-danger">{passwordError}</p>}

			{generalError && <p className="help is-danger">{generalError}</p>}

			<div className="field">
				<p className="control">
					<button
						type="submit"
						className={`button is-success ${isLoading ? 'is-loading' : ''}`}
						disabled={isLoading} // Відключаємо кнопку під час завантаження
					>
						Вхід
					</button>
				</p>
			</div>
		</form>
	);
};
