'use strict';

interface ValidationPatterns {
	[key: string]: RegExp;
}

const validationPatterns: ValidationPatterns = {
	name: /^[a-zA-Zа-яА-ЯёЁїЇіІєЄ\s-]{2,25}$/,
	email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/,
	phone: /^\+?[0-9]{6,12}$/,
	text: /.+/,
	number: /^\d+$/,
	password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&.])[A-Za-z\d@$!%*#?&.]{8,}$/,
};

interface ValidationInput {
	value: string;
	type?: string;
	id?: string;
	name?: string;
	required?: boolean;
}

/**
 * Функція для отримання регулярного виразу
 * @param input - HTML-елемент або кастомний об'єкт для валідації.
 * @return Регулярний вираз для валідації або null, якщо не знайдено.
 */

const getPattern = (input: ValidationInput): RegExp | null => {
	// Використовуємо наш об'єкт, а не намагаємось викликати getAttribute
	const type = input.type || 'text';
	const id = input.id?.toLowerCase() || '';
	const name = input.name?.toLowerCase() || '';

	if (type === 'email') return validationPatterns.email;
	if (type === 'tel' || id.includes('phone') || name.includes('phone')) return validationPatterns.phone;
	if (type === 'password' || id.includes('password') || name.includes('password')) return validationPatterns.password;
	if (type === 'text' && (id.includes('name') || name.includes('name'))) return validationPatterns.name;
	if (type === 'number') return validationPatterns.number;

	return validationPatterns.text;
};

/**
 * Валідує одне поле вводу
 * @param input -Кастомний об'єкт для валідації.
 * @param {string} customErrorMessage - Повідомлення про помилку, яке буде використано замість стандартного.
 * @returns Рядок з повідомленням про помилку або null, якщо валідація успішна.
 */

export const validateField = (input: ValidationInput, customErrorMessage: string = 'Пароль має містити велику літеру, цифру та спецсимвол'): string | null => {
	const pattern = getPattern(input);
	const value = input.value.trim();

	if (!input.required && value !== '') {
		return null;
	}

	if (pattern && !pattern.test(value)) {
		console.log('Testing pattern:', pattern, 'on value:', value);

		return customErrorMessage;
	}

	return null;
};
