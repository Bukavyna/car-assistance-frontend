import { fetchFromApi} from './client';

// Типізація для користувача
interface NewUser {
	email: string;
	password: string;
}

// Припустимо, що у відповіді від сервера приходить токен і дані користувача
interface AuthResponse {
	user: {
		id: string;
		email: string;
	};
	token: string;
}

// Функція для реєстрації нового користувача
export const registerUser = async (userData: NewUser): Promise<AuthResponse> => {
	const options: RequestInit = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(userData),
	};

	return fetchFromApi('/register', options);
};

// Функція для входу користувача
export const loginUser = async (userData: NewUser): Promise<AuthResponse> => {
	const options: RequestInit = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(userData),
	};

	return fetchFromApi('/login', options);
};
