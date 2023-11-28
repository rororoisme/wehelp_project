import React, { createContext, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { collection, getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export const PomodoroContext = createContext();

export const PomodoroProvider = ({ children }) => {
    const [pomodoroCount, setPomodoroCount] = useState(0);
    const [lastCompletedPomodoro, setLastCompletedPomodoro] = useState(null);

    // 新增一個函數來從 Firebase 讀取番茄鐘次數
    const loadPomodoroCount = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            const docRef = doc(db, 'pomodoroCounts', user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setPomodoroCount(docSnap.data().count);
            } else {
                // 第一次讀取不到時, 創建新的
                try {
                    await setDoc(docRef, { count: 0 });
                    setPomodoroCount(0);
                } catch (e) {
                    console.error("創建新的番茄中次數失敗", e);
                }
            }
        }
    };

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
        <PomodoroContext.Provider value={{ pomodoroCount, incrementPomodoroCount, lastCompletedPomodoro, loadPomodoroCount }}>
            {children}
        </PomodoroContext.Provider>
    );
};
