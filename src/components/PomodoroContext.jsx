import React, { createContext, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

export const PomodoroContext = createContext();

export const PomodoroProvider = ({ children }) => {
    const [pomodoroCount, setPomodoroCount] = useState(0);
    const [lastCompletedPomodoro, setLastCompletedPomodoro] = useState(null);

    // setPomodoroCount不夠用, 寫incrementPomodoroCount去改變set 的計算方式
    const incrementPomodoroCount = async () => {
        setPomodoroCount((prevCount) => {
            const newCount = prevCount + 1;
            const newRecord = {
                date: new Date().toLocaleDateString('en-CA'),
                imageNumber: newCount,
                // date: new Date().toISOString().split('T')[0],
                // imageNumber: newCount,
            };
            setLastCompletedPomodoro(newRecord);
    
            // 更新 firebase 數據
            updateFirebaseRecord(newRecord);
    
            return newCount;
        });
    };

    const updateFirebaseRecord = async (record) => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            const docRef = doc(db, 'pomodoroImages', user.uid);
            await setDoc(docRef, { lastCompletedPomodoro: record }, { merge: true });
        }
    };


    return (
        <PomodoroContext.Provider value={{ pomodoroCount, incrementPomodoroCount, lastCompletedPomodoro, setLastCompletedPomodoro , setPomodoroCount}}>
            {children}
        </PomodoroContext.Provider>
    );
};

