import React from 'react';
import indexLayoutStyles from '../styles/indexLayout.module.css';
import Pomodoro from '../components/PomodoroCP';
import MyFullCalendar from '../components/MyFullCalendarCP';
import { FriendsProvider } from '../components/FriendsContext';
import FriendsList from '../components/FriendsList';
import useProtectedRoute from '../hooks/useProtectedRoute';
import { useRouter } from 'next/router';
import { logout } from '../utils/logout';
import styles from '../styles/friends.module.css'; // TODO:水滴特效, 到時候再組件特製給friends, 重做一個index.jsx 用

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
        <div className={styles.container1}>
            <FriendsProvider>
                <div className={styles.drop1}>
                    <div className={styles.content1}>
                        <h2 className={styles}>我的好友列表</h2>
                        <FriendsList className={styles.p1}/>
                    </div>
                </div>
            </FriendsProvider>

            <div>
                <Pomodoro />
                {/* //TODO 把登出弄到navbar上 */}
                <button onClick={handleLogout} className={styles.logoutbtn}>登出</button>
            </div>

            <div className={indexLayoutStyles.calendar}>
                <h2>打卡日曆</h2>
                <MyFullCalendar />
            </div>
        </div>
    );
}
