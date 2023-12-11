// 生成calendar/[calendarId]路由的頁面
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import PomodoroImage from '../../components/PomodoroImage';
import { collection, query, where, onSnapshot, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import styles from '../../styles/fullCalendar.css';
import { getAuth } from 'firebase/auth';
import CalendarMsg from '../../components/CalendarMsg';
import FriendsMsg from '../../components/FriendsMsg';

export default function CalendarPage() {
    const router = useRouter();
    const { calendarId } = router.query; // 裝網址裡面的 calendarId
    const [events, setEvents] = useState([]);
    // 讀取留言功能
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState({ mood: '' });
    // 朋友留言功能
    const [friendsMsgModalOpen, setFriendsMsgModalOpen] = useState(false);
    const [selectedEvent2, setSelectedEvent2] = useState({ date: '', mood: '', message: '' });

    const handleEventClick = (clickInfo) => {
        console.log(clickInfo)
        const { mood } = clickInfo.event.extendedProps;
        setSelectedEvent({ mood });
        setModalOpen(true);
    };


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
        return (
            <>
                <PomodoroImage imageNumber={eventInfo.event.extendedProps.imageNumber} />
                <button class="msgBtn" onClick= {
                    (e) => {
                        // console.log(eventInfo.event)
                        openFriendsMsgModal(eventInfo.event.startStr);
                        e.stopPropagation(); 
                    }
                }>審查</button>
            </>
        );
    };

    const openFriendsMsgModal = (date) => {
        setSelectedEvent2({ date });
        setFriendsMsgModalOpen(true);
    }

    // Firebase 寫入留言
    const handleSendMsg = async (messageStr, dateStr) => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            const newMsg = {
                uid: user.uid,
                targetUid: calendarId,
                msg: messageStr,
                date: dateStr
            };
            const docRef = doc(collection(db, 'Msg'));
            await setDoc(docRef, newMsg);
        }
    };


    return (
        <div class="clBackground">
            <div class="clContainer">
                <button onClick={goMainPage} class="logoutbtn">回到首頁</button>
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                    eventContent={eventContent}
                    timeZone="Asia/Taipei"
                    eventClick={handleEventClick}
                />
                <CalendarMsg 
                    isOpen={modalOpen} 
                    mood={selectedEvent.mood} 
                    message={selectedEvent.message} 
                    onClose={() => setModalOpen(false)}
                />
                <FriendsMsg 
                isOpen={friendsMsgModalOpen} 
                onSend={handleSendMsg}
                onClose={() => setFriendsMsgModalOpen(false)}
                eventDate={selectedEvent2.date}
                />
            </div>
        </div>
    );
}