import { useState } from 'react';
import { validateField } from '../utils/validation';

export const useAuthForm = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [emailError, setEmailError] = useState<string | null>(null);
	const [passwordError, setPasswordError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [generalError, setGeneralError] = useState<string | null>(null);

	const validateForm = () => {
		const newEmailError = validateField({ type: 'email', value: email, required: true } as HTMLInputElement);
		const newPasswordError = validateField({ type: 'password', value: password, required: true } as HTMLInputElement);

		setEmailError(newEmailError);
		setPasswordError(newPasswordError);

		return !newEmailError && !newPasswordError;
	};

	const resetError = () => {
		setEmailError(null);
		setPasswordError(null);
		setGeneralError(null);
	}

	return {
		email,
		setEmail,
		password,
		setPassword,
		emailError,
		setEmailError,
		passwordError,
		setPasswordError,
		isLoading,
		setIsLoading,
		generalError,
		setGeneralError,
		validateForm,
		resetError
	};
};
