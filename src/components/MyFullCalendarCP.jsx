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

    // 抽離到 PomodoroImage 組件
    // const eventContent = (eventInfo) => (
    //     <div style={{
    //         color: 'unset', // TODO: 沒用, 要再想辦法去掉圖片背景預設的藍色
    //         display: 'flex',
    //         justifyContent: 'center',
    //         alignItems: 'center', 
    //         height: '100%',    
    //         width: '100%'         
    //     }}>
    //         <img 
    //             src={`/pic/a${eventInfo.event.extendedProps.imageNumber}.png`} 
    //             alt={`Pomodoro ${eventInfo.event.extendedProps.imageNumber}`}
    //             style={{ 
    //                 width: '90px', 
    //                 height: '60px',
    //                 maxWidth: '100%',
    //                 maxHeight: '100%'
    //             }} 
    //         />
    //     </div>
    // );
    

    return (
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventContent={eventContent}
        />
    );
}
