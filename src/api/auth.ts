import { fetchFromApi} from './client';

interface BaseUser {
	email: string;
	password: string;
}

// Для реєстрації
export interface NewUser extends BaseUser{
	repeatPassword?: string;
	firstName?: string;
	lastName?: string;
}

// Припустимо, що у відповіді від сервера приходить токен і дані користувача
export interface AuthResponse {
	user: {
		id: string;
		email: string;
	};
	token: string;
}

// Функція для реєстрації нового користувача
export const registerUser = async (userData: NewUser): Promise<AuthResponse> => {
	return fetchFromApi('/auth/registration', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(userData),
	});
};

// Функція для входу користувача
export const loginUser = async (userData: BaseUser): Promise<AuthResponse> => {
	return fetchFromApi('/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(userData),
	});
};
