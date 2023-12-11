import { useContext, useEffect, useState } from 'react';
import { PomodoroContext } from './PomodoroContext';
import styles from '../styles/home.module.css';
import { db } from '../firebase/firebaseConfig';
import { getDoc, setDoc, doc, updateDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import PomodoroMsg from './PomodoroMsg';

export default function Pomodoro() {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [showImage, setShowImage] = useState(false);
    // 留言功能
    const [showModal, setShowModal] = useState(false);
    const [mood, setMood] = useState('');
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
                        setShowModal(true);
                        setShowImage(false);
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

    const startTimer = () => {
        setIsRunning(true);
        setShowImage(true);
    }

    const stopTimer = () => setIsRunning(false);
    const resetTimer = () => {
        setTimeLeft(25 * 60);
        setIsRunning(false);
    };
    const nextPomodoro = () => {
        resetTimer();
        incrementPomodoroCount();
        setShowModal(true);
        setShowImage(false);
    };

    const tryTime = () => {
        setTimeLeft(3 * 1);
        setIsRunning(false);
    }

    const increaseTime = () => {
        setTimeLeft(timeLeft => timeLeft + 60);
    };
    const decreaseTime = () => {
        setTimeLeft(timeLeft => Math.max(timeLeft - 60, 0));
    };

    const breakTime = () => {
        setTimeLeft(5 * 60);
        setIsRunning(false);
    }

    const saveMsg = (mood) => {
        setMood(mood);
        // FireBase update
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            const today = new Date().toLocaleDateString('en-CA');
            const docId = `${user.uid}_${today}`;
            const docRef = doc(db, 'pomodoroImages', docId);
    
            updateDoc(docRef, {
                mood: mood,
            });
        }
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


    return (
        <div className={styles.row}>
            <div className={styles.column}>
                <div className={styles.itemPomo}>
                    <h3 className={styles.itemsTitle}>時數調整</h3>
                    <div className={styles.btnGroup}>
                        <button onClick={increaseTime} className={styles.btnPomo}>增加</button>
                        <button onClick={decreaseTime} className={styles.btnPomo}>減少</button>
                        <button onClick={breakTime} className={styles.btnPomo}>休息</button>
                        <button onClick={tryTime} className={styles.btnPomo}>試用</button>
                    </div>
                </div>
            </div>
            <div className={styles.column}>
                <div className={styles.itemPomo}>
                    {showImage && <img className={styles.pomoPic} src="/pic/pink.jpg" alt="番茄鐘背景"/>}
                    <h3 className={styles.pomoContent}>{new Date(timeLeft * 1000).toISOString().slice(14, 19)}</h3>
                </div>
            </div>
            <div className={styles.column}>
                <div className={styles.itemPomo}>
                <h3 className={styles.itemsTitle}>番茄鐘</h3>
                <div className={styles.btnGroup}>
                    <button onClick={startTimer} className={styles.btnPomo}>開始</button>
                    <button onClick={stopTimer} className={styles.btnPomo}>停止</button>
                    <button onClick={resetTimer} className={styles.btnPomo}>重置</button>
                    <button onClick={nextPomodoro} className={styles.btnPomo}>快轉</button>
                    </div>
                </div>
            </div>
            <PomodoroMsg
                isOpen={showModal} 
                onSave={saveMsg} 
                onClose={() => setShowModal(false)} 
            />
        </div>
    );
}