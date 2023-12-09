import React, { useState, useEffect, useContext } from 'react';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { FriendsContext } from './FriendsContext';
import styles from '../styles/home.module.css';

export default function FriendsInvitation () {
    const [requests, setRequests] = useState([]);
    const { currentUser } = useContext(FriendsContext);

    useEffect(() => {
        const fetchRequests = async () => {
            if (currentUser) {
                const q = query(
                    collection(db, 'friendRequests'),
                    where('to', '==', currentUser.uid),
                    where('status', '==', 'pending')
                );

                const querySnapshot = await getDocs(q);
                const fetchedRequests = [];
                querySnapshot.forEach((doc) => {
                    // 把id:doc.id 與 q 找到的字段物件拆開,再融合
                    // id:doc.id / from:.... / to:..... / fromUserName:... 等等一大包
                    fetchedRequests.push({ id: doc.id, ...doc.data() });
                });
                setRequests(fetchedRequests);
            }
        };
        fetchRequests();
    }, [currentUser]);

    // 合併為一個函式去處理好友狀態
    const handleRequest = async (requestId, isAccept) => {
        const requestRef = doc(db, 'friendRequests', requestId);
        await updateDoc(requestRef, { status: isAccept ? 'accepted' : 'rejected' });

        // 更新好友邀請的狀態
        setRequests(requests.map(request => 
            request.id === requestId ? { ...request, isHandled: true } : request
        ));
    };

    return (
        <div className={styles.column}>
            <div className={styles.itemFriends}>
                <h3 className={styles.itemsTitle}>好友請求</h3>
                {requests.map((request) => (
                    !request.isHandled && (
                        <div key={request.id}>
                            <p className={styles.by}>來自: {request.fromUserName}</p>
                            <button className={styles.btn} onClick={() => handleRequest(request.id, true)}>接受</button>
                            <button className={styles.btnRed} onClick={() => handleRequest(request.id, false)}>拒絕</button>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

