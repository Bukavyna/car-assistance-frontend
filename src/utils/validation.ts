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
	password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, // Приклад для пароля
};

/**
 * Функція для отримання регулярного виразу на основі атрибутів поля вводу
 * @param input - HTML-елемент поля вводу (input або textarea).
 * @return Регулярний вираз для валідації або null, якщо не знайдено.
 */

const getPattern = (input: HTMLInputElement | HTMLTextAreaElement): RegExp | null => {
	const type = input.getAttribute('type') || input.tagName.toLowerCase();
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
 * @param input -HTML-елемент для вводу.
 * @returns Рядок з повідомленням про помилку або null, якщо валідація успішна.
 */

export const validateField = (input: HTMLInputElement | HTMLTextAreaElement): string | null => {
	const pattern = getPattern(input);
	const value = input.value.trim();
	const errorMessage = input.dataset.errorMessage || 'Невірний вхід';

	if (!input.required && value === '') {
		return null;
	}

	if (pattern && !pattern.test(value)) {
		return errorMessage;
	}

	return null;
};
