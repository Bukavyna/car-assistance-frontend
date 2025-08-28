const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchFromApi<T>(endpoint: string, options: RequestInit) {
	const response = await fetch(`${BASE_URL}${endpoint}`, options);

	let data: T | null;
	try {
		data = await response.json();
	} catch {
		data = null;
	}

	if (!response.ok) {
		const message = (data as any)?.message || response.statusText;
		throw new Error(`API error: ${response.status} ${message}`);
	}

	return data as T;
}