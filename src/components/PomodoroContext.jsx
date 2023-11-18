import React, { createContext, useState } from 'react';

export const PomodoroContext = createContext();

export const PomodoroProvider = ({ children }) => {
    const [pomodoroCount, setPomodoroCount] = useState(0);
    const [lastCompletedPomodoro, setLastCompletedPomodoro] = useState(null);

    const incrementPomodoroCount = () => {
        setPomodoroCount((prevCount) => {
            const newCount = prevCount + 1;
            setLastCompletedPomodoro({
                date: new Date().toISOString().split('T')[0], // 儲存當天的日期
                imageNumber: newCount, // 圖片編號對應番茄鐘次數
            });
            return newCount;
        });
    };

    return (
        <PomodoroContext.Provider value={{ pomodoroCount, incrementPomodoroCount, lastCompletedPomodoro }}>
            {children}
        </PomodoroContext.Provider>
    );
};
