import { useContext, useEffect, useState } from 'react';
import { PomodoroContext } from './PomodoroContext';
import styles from '../styles/pomodoro.module.css';
import { db } from '../firebase/firebaseConfig';
import { where, getDoc, setDoc, query, collection, doc } from 'firebase/firestore';
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

