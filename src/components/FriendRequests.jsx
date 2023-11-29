import React, { useState, useEffect, useContext } from 'react';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { FriendsContext } from './FriendsContext';

const FriendRequests = () => {
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
                    fetchedRequests.push({ id: doc.id, ...doc.data() });
                });
                setRequests(fetchedRequests);
            }
        };
        fetchRequests();
    }, [currentUser]);

    // const handleAccept = async (requestId) => {
    //     const requestRef = doc(db, 'friendRequests', requestId);
    //     await updateDoc(requestRef, { status: 'accepted' });
    // };

    // const handleReject = async (requestId) => {
    //     const requestRef = doc(db, 'friendRequests', requestId);
    //     await updateDoc(requestRef, { status: 'rejected' });
    // };

    // 合併為一個函式去處理好友狀態
    const handleRequest = async (requestId, isAccept) => {
        const requestRef = doc(db, 'friendRequests', requestId);
        await updateDoc(requestRef, { status: isAccept ? 'accepted' : 'rejected' });

        // 更新请求的处理状态
        setRequests(requests.map(request => 
            request.id === requestId ? { ...request, isHandled: true } : request
        ));
    };

    return (
        <div>
            <h2>好友請求</h2>
            {requests.map((request) => (
                !request.isHandled && (
                    <div key={request.id}>
                        <p>來自: {request.from}</p>
                        <button onClick={() => handleRequest(request.id, true)}>接受</button>
                        <button onClick={() => handleRequest(request.id, false)}>拒絕</button>
                    </div>
                )
            ))}
        </div>
    );
};

export default FriendRequests;
