import React, { createContext, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

export const PomodoroContext = createContext();

// Firebase Update
export const PomodoroProvider = ({ children }) => {
    const [pomodoroCount, setPomodoroCount] = useState(0);
    const [lastCompletedPomodoro, setLastCompletedPomodoro] = useState(null);
    const auth = getAuth();

    const incrementPomodoroCount = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            const today = new Date().toLocaleDateString('en-CA');
            const docId = `${user.uid}_${today}`;
    
            setPomodoroCount((prevCount) => {
                const newCount = prevCount + 1;
                const newRecord = {
                    date: today,
                    imageNumber: newCount,
                    id: user.uid
                };
    
                setLastCompletedPomodoro(newRecord);
    
                // 僅更新當天的記錄
                const docRef = doc(db, 'pomodoroImages', docId);
                setDoc(docRef, newRecord, { merge: true });
    
                return newCount;
            });
        }
    };
    
    // 1.第二版-----------------------------------------------------------------------------------
    // 把「更新」改寫為只針對當天操作
    // const incrementPomodoroCount = async () => {
    //     const auth = getAuth();
    //     const user = auth.currentUser;
    
    //     if (user) {
    //         const newCount = pomodoroCount + 1;
    //         const newRecord = {
    //             date: new Date().toLocaleDateString('en-CA'),
    //             imageNumber: newCount,
    //             id: user.uid
    //         };
    
    //         setPomodoroCount(newCount);
    //         setLastCompletedPomodoro(newRecord);
    
    //         // 更新 Firebase
    //         const docRef = doc(db, 'pomodoroImages', `${user.uid}_${newRecord.date}`);
    //         await setDoc(docRef, newRecord, { merge: true });
    //     }
    // };
    
// 1.第一版-----------------------------------------------------------------------------------
// 因incrementPomodoroCount 與 updatePamodoroCount 都會對 firebase 的番茄鐘次數操作, 將兩者合併
// export const PomodoroProvider = ({ children }) => {
//     const [pomodoroCount, setPomodoroCount] = useState(0);
//     const [lastCompletedPomodoro, setLastCompletedPomodoro] = useState(null);

//     // setPomodoroCount不夠用, 寫incrementPomodoroCount去改變set 的計算方式
//     const incrementPomodoroCount = async (user) => {
//         setPomodoroCount((prevCount) => {
//             const newCount = prevCount + 1;
//             const newRecord = {
//                 date: new Date().toLocaleDateString('en-CA'),
//                 imageNumber: newCount
//             };

//             setLastCompletedPomodoro(newRecord);
    
//             // 更新 firebase 數據
//             updateFirebaseRecord(newRecord);
    
//             return newCount;
//         });
//     };

//     const updateFirebaseRecord = async (record) => {
//         const auth = getAuth();
//         const user = auth.currentUser;
//         if (user) {
//             const docRef = doc(db, 'pomodoroImages', user.uid);
//             await setDoc(docRef, record, { merge: true });
//         }
//     };


    return (
        <PomodoroContext.Provider value={{ pomodoroCount, incrementPomodoroCount, lastCompletedPomodoro, setLastCompletedPomodoro , setPomodoroCount}}>
            {children}
        </PomodoroContext.Provider>
    );
};

