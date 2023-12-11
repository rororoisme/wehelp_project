import React from 'react';
import styles from '../styles/msg.module.css';

export default function MsgRead({ isOpen, msgs, onClose }) {
    if (!isOpen) return null;

    return (
        <div className={styles.modal}>
            <div className={styles.modalContentRead}>
                <span className={styles.closeButton} onClick={onClose}>&times;</span>
                <h2 className={styles.itemsTitle}>夥伴共筆</h2>
                {msgs.map((message, index) => (
                    <div className={styles.msgContainer} key={index}>
                        <p className={styles.msgContent}>{message.msg}</p>
                        <p>來自: {message.uid}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
