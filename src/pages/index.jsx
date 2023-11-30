import React, { useContext } from 'react';
import indexLayoutStyles from '../styles/indexLayout.module.css';
import Pomodoro from '../components/PomodoroCP';
import MyFullCalendar from '../components/MyFullCalendarCP';
import { FriendsProvider } from '../components/FriendsContext';
import FriendsList from '../components/FriendsList';
import PomodoroImage from '../components/PomodoroImage';
import { PomodoroContext } from '../components/PomodoroContext';
import useProtectedRoute from '../hooks/useProtectedRoute';
import { logout } from '../utils/logout';
import styles from '../styles/friends.module.css'; // TODO:水滴特效, 到時候再組件特製給friends, 重做一個index.jsx 用
import FriendRequests from '../components/FriendRequests'

export default function Home() {
    const { lastCompletedPomodoro } = useContext(PomodoroContext);
    // 本來想把currentUser 也用useContext抓過來, 但會一直報undefined, 改成統一在friendRequest 元件內處理

    useProtectedRoute();

    const handleLogout = async () => {
        try {
            await logout();
            router.push('/login');
        } catch (error) {
            console.error("Error logging out", error);
        }
    };

    return (
        <FriendsProvider>
            <div className={styles.backgroud}>
                <div className={styles.container1}>
                    
                        <div className={styles.drop1}>
                            <div className={styles.content1}>
                                <h2 className={styles}>我的好友列表</h2>
                                <FriendsList className={styles.p1}/>
                            </div>
                        </div>

                    <div>
                        <Pomodoro />
                        <button onClick={handleLogout} className={styles.logoutbtn}>登出</button>
                    </div>

                    {/* 被組件化的圖片 */}
                    <div className={styles.container1}>
                        <div className={styles.drop1}>
                            <div>
                            {lastCompletedPomodoro && <PomodoroImage imageNumber={lastCompletedPomodoro.imageNumber} />}
                            </div>
                        </div>
                    </div>

                    <div>
                        <FriendRequests/>
                    </div>

                    <div className={indexLayoutStyles.calendar}>
                        <h2>打卡日曆</h2>
                        <MyFullCalendar />
                    </div>
                </div>
            </div>
        </FriendsProvider>
    );
}
