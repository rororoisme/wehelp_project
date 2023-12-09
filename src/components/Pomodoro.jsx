import { useContext, useEffect, useState } from 'react';
import { PomodoroContext } from './PomodoroContext';
import styles from '../styles/home.module.css';
import { db } from '../firebase/firebaseConfig';
import { getDoc, setDoc, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function Pomodoro() {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const { incrementPomodoroCount } = useContext(PomodoroContext);
    const { setLastCompletedPomodoro } = useContext(PomodoroContext);
    const { setPomodoroCount } = useContext(PomodoroContext);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft => {
                    if (timeLeft === 1) {
                        incrementPomodoroCount();
                        setIsRunning(false);
                        return 25 * 60;
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

    const increaseTime = () => {
        setTimeLeft(timeLeft => timeLeft + 60);
    };
    const decreaseTime = () => {
        setTimeLeft(timeLeft => Math.max(timeLeft - 60, 0));
    };

    // fireBase Update & Read
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const today = new Date().toLocaleDateString('en-CA');
                const docId = `${user.uid}_${today}`;
    
                const docRef = doc(db, 'pomodoroImages', docId);
                const docSnap = await getDoc(docRef);
    
                if (docSnap.exists()) {
                    setLastCompletedPomodoro(docSnap.data());
                    setPomodoroCount(docSnap.data().imageNumber);
                } else {
                    const newRecord = {
                        date: today,
                        imageNumber: 0,
                        id: user.uid
                    };
                    await setDoc(docRef, newRecord);
                    setLastCompletedPomodoro(newRecord);
                }
            }
        });
    }, []);    

    const nextPomodoro = () => {
        resetTimer();
        incrementPomodoroCount();
    };
    

    return (
        <div className={styles.row}>
            <div className={styles.bigColumn}>
                <div className={styles.heading}>
                    <h2>番茄鐘</h2>
                </div>
            </div>
            <div className={styles.column}>
                <div className={styles.itemPomo}>
                    <h3 className={styles.itemsTitle}>時數調整</h3>
                    <button onClick={increaseTime} className={styles.btn}>增加</button>
                    <button onClick={decreaseTime} className={styles.btn}>減少</button>
                    <button onClick={resetTimer} className={styles.btn}>重置時數</button>
                </div>
            </div>
            <div className={styles.column}>
                <div className={styles.itemPomo}>
                    <h3 className={styles.itemsTitle}>番茄鐘</h3>
                    <h3 className={styles.pomoContent}>Time Left: {new Date(timeLeft * 1000).toISOString().slice(14, 19)}</h3>
                </div>
            </div>
            <div className={styles.column}>
                <div className={styles.itemPomo}>
                <h3 className={styles.itemsTitle}>番茄鐘</h3>
                <button onClick={startTimer} className={styles.btn}>開始</button>
                    <button onClick={stopTimer} className={styles.btn}>停止</button>
                    <button onClick={resetTimer} className={styles.btn}>重置</button>
                    <button onClick={nextPomodoro} className={styles.btn}>快轉</button>
                </div>
            </div>
        </div>
    );
}