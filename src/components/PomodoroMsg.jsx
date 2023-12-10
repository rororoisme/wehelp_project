import React, { useState } from 'react';
import styles from '../styles/msg.module.css';

export default function PomodoroMsg({ isOpen, onSave, onClose }) {
    const [mood, setMood] = useState('');

    const handleSubmit = () => {
        onSave(mood);
        setMood('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.closeButton} onClick={onClose}>&times;</span>
                <h2 className={styles.itemsTitle}>實驗日誌</h2>
                <input className={styles.msgContent} type="text" value={mood} onChange={(e) => setMood(e.target.value)} placeholder="實驗內容" />
                <button className={styles.btn} onClick={handleSubmit}>動筆</button>
            </div>
        </div>
    );
}
