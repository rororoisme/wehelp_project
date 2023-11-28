import { useContext } from 'react';
import { PomodoroContext } from './PomodoroContext';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import PomodoroImage from './PomodoroImage';


export default function MyFullCalendarCP() {
    const { pomodoroCount, lastCompletedPomodoro  } = useContext(PomodoroContext);

    // 根據番茄鐘計數來創建事件
    const events = [];
    if (lastCompletedPomodoro) {
        for (let i = 0; i < pomodoroCount; i++) {
            events.push({
                title: 'Pomodoro Completed',
                start: lastCompletedPomodoro.date,
                allDay: true,
                imageNumber: lastCompletedPomodoro.imageNumber,
            });
        }
    }
    

    const eventContent = (eventInfo) => {
        return <PomodoroImage imageNumber={eventInfo.event.extendedProps.imageNumber} />;
    };
    
    return (
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventContent={eventContent}
        />
    );
}
