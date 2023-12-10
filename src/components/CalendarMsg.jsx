import React from 'react';
import styles from '../styles/msg.module.css';

export default function CalendarMsg({ isOpen, mood, onClose }) {
    if (!isOpen) return null;

    return (
        <div className={styles.modal}>
            <div className={styles.modalContentRead}>
                <span className={styles.closeButton} onClick={onClose}>&times;</span>
                <h2 className={styles.itemsTitle}>實驗日誌</h2>
                <p className={styles.msgContent}>
                    {mood ? mood : <span className={styles.defaultMsg}>當天並沒有留下實驗記錄</span>}
                </p>
            </div>
        </div>
    );
}
