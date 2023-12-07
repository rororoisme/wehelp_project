import React, { useContext } from 'react';
import Pomodoro from '../components/Pomodoro';
import MyFullCalendar from '../components/MyFullCalendarCP';
import { PomodoroContext } from '../components/PomodoroContext';
import useProtectedRoute from '../hooks/useProtectedRoute';
import { logout } from '../utils/logout';
import styles from '../styles/home.module.css';
import { FriendsProvider } from '../components/FriendsContext';
import FriendsInvitation from '../components/FriendsInvitation.jsx'
import FriendsRequest from '../components/FriendsRequest';
import FriendsList from '../components/FriendsList';

export default function Home() {
    const { lastCompletedPomodoro } = useContext(PomodoroContext);

    useProtectedRoute();

    const handleLogout = async () => {
        try {
            await logout();
            window.location.href = '/';
        } catch (error) {
            console.error("Error logging out", error);
        }
    };
    

    return (
        <FriendsProvider>
            <div className={styles.service}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.bigColumn}>
                            <div className={styles.heading}>
                                <h2>好友</h2>
                            </div>
                        </div>
                        <FriendsInvitation/>
                        <FriendsRequest/>
                        <FriendsList/>
                    </div>
                </div>
            </div>

            <div className={styles.service}>
                <div className={styles.container}>
                    <Pomodoro />
                    <button onClick={handleLogout} className={styles.logoutbtn}>登出</button>
                    </div>
            </div>

            {/* <div className={styles.service}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.bigColumn}>
                            <div className={styles.heading}>
                                <h2>放大鏡</h2>
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.item}>
                                {lastCompletedPomodoro && <PomodoroImage imageNumber={lastCompletedPomodoro.imageNumber} />}
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.item}>
                                {lastCompletedPomodoro && <PomodoroImage imageNumber={lastCompletedPomodoro.imageNumber} />}
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.item}>
                                留言
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}


            <div className={styles.containerCalendar}>
                <div className={styles.calendar}>
                    <h2>打卡日曆</h2>
                    <MyFullCalendar />
                </div>
            </div>
        </FriendsProvider>
    );
}
