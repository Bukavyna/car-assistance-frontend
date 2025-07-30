import { create } from 'zustand/react';

type User = {
	id: string;
	email: string;
}

type AuthStore = {
	user: User | null;
	login: (user: User) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
	user: null,
	login: (user) => ({ user }),
	logout: () => set({ user: null }),
}));
