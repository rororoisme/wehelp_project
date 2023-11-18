import React from 'react';
import indexLayoutStyles from '../styles/indexLayout.module.css';
import Pomodoro from '../components/PomodoroCP';
import MyFullCalendar from '../components/MyFullCalendarCP';
import { FriendsProvider } from '../components/FriendsContext';
import FriendsList from '../components/FriendsList';
import useProtectedRoute from '../hooks/useProtectedRoute';
import { useRouter } from 'next/router';
import { logout } from '../utils/logout';
import styles from '../styles/every.module.css';

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
        <div className={styles.container}>
            <FriendsProvider>
                <div className={styles.drop}>
                    <div className={styles.content}>
                        <h2 className={styles}>我的好友列表</h2>
                        <FriendsList className={styles.p}/>
                    </div>
                </div>
            </FriendsProvider>

            <div>
                <Pomodoro />
                {/* //TODO 把登出弄到navbar上 */}
                <button onClick={handleLogout}>登出</button>
            </div>

            <div className={indexLayoutStyles.calendar}>
                <h1>我的日曆</h1>
                <MyFullCalendar />
            </div>
        </div>
    );
}
