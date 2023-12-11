import { useContext, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import PomodoroImage from './PomodoroImage';
import { where, onSnapshot, query, collection } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useAuth } from './AuthContext';
import styles from '../styles/fullCalendar.css';
import CalendarMsg from './CalendarMsg';
import MsgRead from './MsgRead';

export default function MyFullCalendarCP() {
    const { currentUser } = useAuth();
    // 留言功能
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState({ mood: ''});
    const [events, setEvents] = useState([]);
    const [msgs, setMsgs] = useState([]);

    // 讀取功能
    const [modalData, setModalData] = useState({ isOpen: false, msg: '', uid: '' });
    const [users, setUsers] = useState([]);

    const handleEventClick = (clickInfo) => {
        const { mood} = clickInfo.event.extendedProps;
        setSelectedEvent({ mood });
        setModalOpen(true);
    };

    // 顯示 user資料庫中抓到的id
    const handleShowMessage = (msg, uid) => {
        const user = users.find(user => user.uid === uid);
        const userName = user ? user.userName : 'Unknown User';
        setModalData({ isOpen: true, msg, uid: userName });
    };

    // Firebase READ
    useEffect(() => {
        if (currentUser) {
            const q = query(collection(db, 'pomodoroImages'), where('id', '==', currentUser.uid));
            const msgQuery = query(collection(db, 'Msg'), where('targetUid', '==', currentUser.uid));
            const usersQuery = query(collection(db, 'users'));

            // 利用onSnapshot 設置"只要firebase資料更動, 行事曆就同步更動" 的監聽器
            // 監聽 pomodoroImages 集合的狀況
            const unsubscribe = onSnapshot(q, querySnapshot => {
                const userEvents = querySnapshot.docs.map(docSnap => ({
                    title: 'Pomodoro Completed',
                    start: docSnap.data().date,
                    allDay: true,
                    backgroundColor: '#00000000',
                    borderColor: "#00000000",
                    imageNumber: docSnap.data().imageNumber,
                    mood: docSnap.data().mood,
                }));
                setEvents(userEvents);
            });

            // 監聽 Msg 集合的狀況
            const unsubscribeMsg = onSnapshot(msgQuery, querySnapshot => {
                const userMsgs = querySnapshot.docs.map(docSnap => ({
                    date: docSnap.data().date,
                    msg: docSnap.data().msg,
                    uid: docSnap.data().uid
                }));
                setMsgs(userMsgs);
            });

            // 取出 User 集合的內容
            const unsubscribeUsers = onSnapshot(usersQuery, querySnapshot => {
                const usersData = querySnapshot.docs.map(docSnap => ({
                    uid: docSnap.id,
                    userName: docSnap.data().userName
                }));
                setUsers(usersData);
            });


            return () => {
                unsubscribe();
                unsubscribeMsg();
                unsubscribeUsers();
            };
        }
    }, [currentUser]);

    const eventContent = (eventInfo) => {
        const eventMsg = msgs.find(msg => msg.date === eventInfo.event.startStr);
        return (
            <>
                <PomodoroImage imageNumber={eventInfo.event.extendedProps.imageNumber} />
                {eventMsg && <button class="msgBtn" onClick={
                    (e) => {
                        handleShowMessage(eventMsg.msg, eventMsg.uid);
                        e.stopPropagation();
                    }
                }>夥伴共筆</button>}
            </>
        );
    };

    return (
        <>
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
            onClose={() => setModalOpen(false)}
        />
        <MsgRead
        isOpen={modalData.isOpen}
        msg={modalData.msg}
        uid={modalData.uid}
        onClose={() => setModalData({ ...modalData, isOpen: false })}
        />
        </>
    );
}