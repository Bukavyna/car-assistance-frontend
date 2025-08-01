import { useState } from 'react';
import { validateField } from '../utils/validation';

export const useAuthForm = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [repeatPassword, setRepeatPassword] = useState<string>('');
	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [emailError, setEmailError] = useState<string | null>(null);
	const [passwordError, setPasswordError] = useState<string | null>(null);
	const [repeatPasswordError, setRepeatPasswordError] = useState<string | null>(null);
	const [firstNameError, setFirstNameError] = useState<string | null>(null);
	const [lastNameError, setLastNameError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [generalError, setGeneralError] = useState<string | null>(null);

	// 1. Валідуємо всі поля
	const validateForm = () => {
		const newEmailError = validateField({ type: 'email', value: email, required: true } as HTMLInputElement);
		const newPasswordError = validateField({ type: 'password', value: password, required: true } as HTMLInputElement);
		const newRepeatPasswordError = validateField({ type: 'password', value: repeatPassword, required: true } as HTMLInputElement);
		const newFirstNameError = validateField({ type: 'text', name: 'name', value: firstName, required: true } as HTMLInputElement);
		const newLastNameError = validateField({ type: 'text', name: 'name', value: lastName, required: true } as HTMLInputElement);

		// 2. Додаємо додаткову логіку для "Повторного пароля"
		let finalRepeatPasswordError = newRepeatPasswordError;
		if (!finalRepeatPasswordError && password !== repeatPassword) {
			finalRepeatPasswordError ='Паролі не співпадають';
		}

		// 3. Оновлюємо стейт помилок
		setEmailError(newEmailError);
		setPasswordError(newPasswordError);
		setRepeatPasswordError(finalRepeatPasswordError);
		setFirstNameError(newFirstNameError);
		setLastNameError(newLastNameError);

		// 4. Повертаємо загальний результат валідації
		return !newEmailError && !newPasswordError && !finalRepeatPasswordError && !newFirstNameError && !newLastNameError;
	};

	const resetError = () => {
		setEmailError(null);
		setPasswordError(null);
		setRepeatPasswordError(null);
		setFirstNameError(null);
		setLastNameError(null);
		setGeneralError(null);
	}

	return {
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
		setEmailError,
		passwordError,
		setPasswordError,
		repeatPasswordError,
		setRepeatPasswordError,
		firstNameError,
		setFirstNameError,
		lastNameError,
		setLastNameError,
		isLoading,
		setIsLoading,
		generalError,
		setGeneralError,
		validateForm,
		resetError
	};
};
