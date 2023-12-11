import React, { useContext } from 'react';
import Pomodoro from '../components/Pomodoro';
import MyFullCalendar from '../components/MyFullCalendarCP';
import useProtectedRoute from '../hooks/useProtectedRoute';
import { logout } from '../utils/logout';
import styles from '../styles/home.module.css';
import { FriendsProvider } from '../components/FriendsContext';
import FriendsInvitation from '../components/FriendsInvitation.jsx'
import FriendsRequest from '../components/FriendsRequest';
import FriendsList from '../components/FriendsList';

export default function Home() {

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
            <div className={styles.background}>
                <div className={styles.serviceTop}>
                    <div className={styles.container}>
                        <div className={styles.row}>
                            <div className={styles.bigColumn}>
                                <div className={styles.heading}>
                                    <h2 className={styles.manyPic}></h2>
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

                <div className={styles.containerCalendar}>
                    <MyFullCalendar />
                </div>
            </div >
        </FriendsProvider>
    );
}
