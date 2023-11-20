import { useContext, useEffect, useState } from 'react';
import { PomodoroContext } from './PomodoroContext';
import styles from '../styles/pomodoro.module.css';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default function Pomodoro() {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const { incrementPomodoroCount, getPomodoroCount } = useContext(PomodoroContext);

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

    const savePomodoroCompletion = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        
        // 有登錄才能看
        // 若只有 user 會連登入的那次都寫入
        if (user) {
            const today = new Date().toISOString().split('T')[0];
            try {             
                await addDoc(collection(db, 'project'), {
                    userId: user.uid,
                    date: today,
                    // 其他後續會用到的數據
                });
                console.log("番茄鐘成功儲存!");
            } catch (e) {
                console.error("番茄鐘寫入失敗!", e);
            }
        }
    };

    const nextPomodoro = () => {
        resetTimer();
        incrementPomodoroCount();
        savePomodoroCompletion();
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

