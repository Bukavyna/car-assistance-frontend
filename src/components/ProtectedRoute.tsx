import * as React from 'react';
import { Navigate} from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const user = useAuthStore((state) => state.user);

	if (!user) {
		return <Navigate to="/login" replace />
	}

	return <>{children}</>;
}
