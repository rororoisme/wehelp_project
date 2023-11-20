import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../components/AuthContext';

const useProtectedRoute = () => {
    const { currentUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!currentUser) {
            router.push('/login');
        }
    }, [currentUser, router]);
};

export default useProtectedRoute;



