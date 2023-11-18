import { useContext } from 'react';
import { PomodoroContext } from './PomodoroContext';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export default function MyFullCalendarCP() {
    const { lastCompletedPomodoro } = useContext(PomodoroContext);

    // 若 laseCompletedPomodoro 存在 (番茄鐘有跑完的次數) 創建events
    const events = lastCompletedPomodoro ? [{
        title: 'Pomodoro Completed',
        start: lastCompletedPomodoro.date,
        allDay: true,
        imageNumber: lastCompletedPomodoro.imageNumber,
    }] : [];

    const eventContent = (eventInfo) => (
        <
        img src={`/pic/${eventInfo.event.extendedProps.imageNumber}.jpg`} 
        alt={`Pomodoro ${eventInfo.event.extendedProps.imageNumber}`}
        style={{ width: '100%', height: 'auto' }} 
        />
    );

    return (
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventContent={eventContent}
        />
    );
}
