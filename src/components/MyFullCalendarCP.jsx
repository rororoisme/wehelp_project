import { useContext } from 'react';
import { PomodoroContext } from './PomodoroContext';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import PomodoroImage from './PomodoroImage';


export default function MyFullCalendarCP() {
    const { lastCompletedPomodoro } = useContext(PomodoroContext);

    // 若 laseCompletedPomodoro 存在 (番茄鐘有跑完的次數) 創建events
    const events = lastCompletedPomodoro ? [{
        title: 'Pomodoro Completed',
        start: lastCompletedPomodoro.date,
        allDay: true,
        imageNumber: lastCompletedPomodoro.imageNumber,
    }] : [];


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
