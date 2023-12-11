import React from 'react';
import styles from '../styles/msg.module.css';

export default function MsgRead({ isOpen, msg, uid, onClose }) {
    if (!isOpen) return null;

    return (
        <div className={styles.modal}>
            <div className={styles.modalContentRead}>
                <span className={styles.closeButton} onClick={onClose}>&times;</span>
                <h2 className={styles.itemsTitle}>夥伴共筆</h2>
                <p className={styles.msgContent}>{msg}</p>
                <p>來自: {uid}</p>
            </div>
        </div>
    );
}
