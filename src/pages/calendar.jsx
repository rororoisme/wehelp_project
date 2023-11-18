import MyFullCalendar from '../components/MyFullCalendarCP';
import useProtectedRoute from '../hooks/useProtectedRoute';
import { useRouter } from 'next/router';
import { logout } from '../utils/logout';

export default function Home() {
    useProtectedRoute();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logout();
            router.push('/login');
        } catch (error) {
            console.error("Error logging out", error);
        }
    };
    return (
        <div>
            <h1>我的日曆</h1>
            <button onClick={handleLogout}>登出</button>
            <MyFullCalendar />
        </div>
    );
}
