import { useContext, useEffect, useState } from 'react';
import { PomodoroContext } from './PomodoroContext';
import styles from '../styles/every.module.css';

export default function Pomodoro() {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const { incrementPomodoroCount } = useContext(PomodoroContext);

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

    const nextPomodoro = () => {
        resetTimer();
        incrementPomodoroCount();
    };

    
    

    return (
        <div className={styles.container}>
            <div className={styles.drop}>Time Left: {new Date(timeLeft * 1000).toISOString().slice(14, 19)}
                <div className={styles.content}>
                    <button onClick={startTimer} className={styles.p}>開始</button>
                    <button onClick={stopTimer} className={styles.p}>停止</button>
                    <button onClick={resetTimer} className={styles.p}>重置</button>
                    <button onClick={nextPomodoro} className={styles.p}>快轉</button>
                </div>
            </div>
        </div>
    );
}

