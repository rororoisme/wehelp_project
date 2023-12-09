import { useContext, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import PomodoroImage from './PomodoroImage';
import { where, onSnapshot, query, collection } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useAuth } from './AuthContext';
import styles from '../styles/fullCalendar.css';


export default function MyFullCalendarCP() {
    const { currentUser } = useAuth();
    const [events, setEvents] = useState([]);

    // Firebase READ
    useEffect(() => {
        if (currentUser) {
            const q = query(collection(db, 'pomodoroImages'), where('id', '==', currentUser.uid));

            // 利用onSnapshot 設置"只要firebase資料更動, 行事曆就同步更動" 的監聽器
            const unsubscribe = onSnapshot(q, querySnapshot => {
                
                const userEvents = querySnapshot.docs.map(docSnap => ({
                    title: 'Pomodoro Completed',
                    start: docSnap.data().date,
                    allDay: true,
                    backgroundColor: '#00000000',
                    borderColor: "#00000000",
                    imageNumber: docSnap.data().imageNumber,
                }));
                setEvents(userEvents);
            });

            return () => unsubscribe();
        }
    }, [currentUser]);

    const eventContent = (eventInfo) => {
        return <PomodoroImage imageNumber={eventInfo.event.extendedProps.imageNumber} />;
    };

    return (
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventContent={eventContent}
            timeZone="Asia/Taipei"
        />
    );
}
