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

    // 處理行事曆上的圖片位置
    const eventContent = (eventInfo) => (
        <div style={{
            color: 'unset',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center', 
            height: '100%',    
            width: '100%'         
        }}>
            <img 
                src={`/pic/a${eventInfo.event.extendedProps.imageNumber}.png`} 
                alt={`Pomodoro ${eventInfo.event.extendedProps.imageNumber}`}
                style={{ 
                    width: '90px', 
                    height: '60px',
                    maxWidth: '100%',
                    maxHeight: '100%'
                }} 
            />
        </div>
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
