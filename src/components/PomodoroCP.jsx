import { useContext, useEffect, useState } from 'react';
import { PomodoroContext } from './PomodoroContext';
import styles from '../styles/pomodoro.module.css';
import { db } from '../firebase/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function Pomodoro() {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const { incrementPomodoroCount } = useContext(PomodoroContext);
    const { setLastCompletedPomodoro } = useContext(PomodoroContext);
    const { setPomodoroCount } = useContext(PomodoroContext);

    // TODO:檢查跑完之後為什麼會從60分開始倒數

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft => {
                    if (timeLeft === 1) {
                        incrementPomodoroCount();
                    }
                    return timeLeft - 1;
                });
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning, incrementPomodoroCount]);

    const startTimer = () => setIsRunning(true);
    const stopTimer = () => setIsRunning(false);
    const resetTimer = () => {
        setTimeLeft(25 * 60);
        setIsRunning(false);
    };

    useEffect(() => {
        const auth = getAuth();
        // 監聽用戶登入狀態, (認證對象, callBack)
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, 'pomodoroImages', user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    // 從後端拿 lastCompletedPomodoro字段，並用 setLastCompletedPomodoro更新
                    setLastCompletedPomodoro(docSnap.data().lastCompletedPomodoro);
                    // 從後端拿 lastCompletedPomodoro.imageNumber, 用 setPomodoroCount更新
                    // incrementPomodoroCount(影響setcount) 是從0開始, 每次跑完都+1, 因此這裡也要call function 讓它一起把context的值與資料庫互動, 更新
                    // 順序為-> 計算docSnap.data().lastCompletedPomodoro.imageNumber-> 丟到setPomodoroCount-> 丟回context
                    setPomodoroCount(docSnap.data().lastCompletedPomodoro.imageNumber);

                } else {
                    // ----firebase沒紀錄, 就寫一個新的
                    const newRecord = {
                        date: new Date().toLocaleDateString('en-CA'),
                        imageNumber: 0,
                    };
                    // 指定紀錄格式為 lastCompletedPomodoro[date:a, imageNumber:a]
                    await setDoc(docRef, { lastCompletedPomodoro: newRecord });
                    // 更新 state
                   setLastCompletedPomodoro(newRecord);
                }
            }
        });
    // 只渲染一次
    }, []);


    const nextPomodoro = () => {
        resetTimer();
        incrementPomodoroCount();
    };
    
    

    return (
        <div className={styles.container}>
            <div className={styles.drop}><h3>Time Left: {new Date(timeLeft * 1000).toISOString().slice(14, 19)}</h3>
                <div className={styles.content}>
                    <button onClick={startTimer} className={styles.btn}>開始</button>
                    <button onClick={stopTimer} className={styles.btn}>停止</button>
                    <button onClick={resetTimer} className={styles.btn}>重置</button>
                    <button onClick={nextPomodoro} className={styles.btn}>快轉</button>
                </div>
            </div>
        </div>
    );
}

