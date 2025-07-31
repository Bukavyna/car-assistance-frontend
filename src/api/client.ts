const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchFromApi(endpoint: string, options?: RequestInit) {
	const response = await fetch(`${BASE_URL}${endpoint}`, options);

	if (!response.ok) {
		throw new Error(`API error: ${response.status} ${response.statusText}`);
	}

	return response.json();
}