import Pomodoro from '../components/Pomodoro';
import { useRouter } from 'next/router';
import { logout } from '../utils/logout';

export default function Home() {
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
            <button onClick={handleLogout}>登出</button>
            <Pomodoro />
        </div>
    );
}