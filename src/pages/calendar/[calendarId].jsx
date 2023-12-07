// 生成calendar/[calendarId]路由的頁面
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import PomodoroImage from '../../components/PomodoroImage';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

export default function CalendarPage() {
    const router = useRouter();
    const { calendarId } = router.query; // 裝網址裡面的 calendarId
    const [events, setEvents] = useState([]);

    useEffect(() => {
        if (calendarId) {
            const q = query(collection(db, 'pomodoroImages'), where('id', '==', calendarId));

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
    }, [calendarId]);

    const goMainPage = async () => {
        try {
            router.push('/main');
        } catch (error) {
            console.error("Error logging out", error);
        }
    };

    const eventContent = (eventInfo) => {
        return <PomodoroImage imageNumber={eventInfo.event.extendedProps.imageNumber} />;
    };

    return (
        <div>
        <button onClick={goMainPage}>回到首頁</button>
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventContent={eventContent}
            timeZone="Asia/Taipei"
        />
        </div>
    );
}
