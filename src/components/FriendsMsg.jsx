import React, { useState } from 'react';
import styles from '../styles/msg.module.css';

export default function FriendsMsg({ isOpen, onSend, onClose, eventDate }) {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        onSend(message, eventDate); // 將留言和事件日期發送
        setMessage('');
        onClose(); // 關閉模態視窗
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.closeButton} onClick={onClose}>&times;</span>
                <h2 className={styles.itemsTitle}>實驗評估</h2>
                <textarea className={styles.msgContent} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="對夥伴的實驗進行考察..." />
                <button className={styles.btn} onClick={handleSend}>動筆</button>
            </div>
        </div>
    );
}
