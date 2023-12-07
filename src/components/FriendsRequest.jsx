import React, { useState, useContext, useEffect } from 'react';
import { FriendsContext } from './FriendsContext';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import styles from '../styles/home.module.css';

export default function FriendsRequest() {
    const { friends, setFriends, currentUser } = useContext(FriendsContext);
    const [newFriendName, setNewFriendName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // 處理添加好友請求
    const handleAddFriend = async () => {
        if (!newFriendName) {
            setErrorMessage('請輸入好友名稱');
            return;
        }

        // 檢查該用戶名稱是否存在於用戶資料庫中
        const userQuery = query(collection(db, 'users'), where('userName', '==', newFriendName));
        const querySnapshot = await getDocs(userQuery);

        if (querySnapshot.empty) {
            setErrorMessage('查無此用戶');
            return;
        }

        // 獲取匹配用戶的 uid和名稱
        let friendUid = '';
        let friendUserName = '';
        querySnapshot.forEach((doc) => {
            friendUid = doc.data().uid;
            friendUserName = doc.data().userName;
        });

        if (friendUid === currentUser.uid) {
            setErrorMessage('不能添加自己為好友');
            return;
        }
        
        // 檢查是否已經是好友
        const friendCheckQuery = query(
            collection(db, 'friendRequests'),
            where('from', '==', currentUser.uid),
            where('to', '==', friendUid),
            where('status', '==', 'accepted')
        );

        const friendCheckSnapshot = await getDocs(friendCheckQuery);
        if (!friendCheckSnapshot.empty) {
            setErrorMessage('你們已經是好友了');
            return;
        }

        const friendCheckQuery2 = query(
            collection(db, 'friendRequests'),
            where('to', '==', currentUser.uid),
            where('from', '==', friendUid),
            where('status', '==', 'accepted')
        );
    
        const friendCheckSnapshot2 = await getDocs(friendCheckQuery2);
        if (!friendCheckSnapshot2.empty) {
            setErrorMessage('你們已經是好友了');
            return;
        }

        // 擋掉等待好友邀請的狀態
        const friendWaitQuery = query(
            collection(db, 'friendRequests'),
            where('to', '==', currentUser.uid),
            where('from', '==', friendUid),
            where('status', '==', 'pending')
        );
    
        const friendWaitSnapshot = await getDocs(friendWaitQuery);
        if (!friendWaitSnapshot.empty) {
            setErrorMessage('對方正在等待您的好友答覆');
            return;
        }

        const friendWaitQuery2 = query(
            collection(db, 'friendRequests'),
            where('to', '==', friendUid),
            where('from', '==', currentUser.uid),
            where('status', '==', 'pending')
        );
    
        const friendWaitSnapshot2 = await getDocs(friendWaitQuery2);
        if (!friendWaitSnapshot2.empty) {
            setErrorMessage('您已送出好友邀請');
            return;
        }

        // 從 users 集合中抓出 userName
        const currentUserQuery = query(collection(db, 'users'), where('uid', '==', currentUser.uid));
        const currentUserSnapshot = await getDocs(currentUserQuery);
        const currentUserName = currentUserSnapshot.docs[0].data().userName;

        // 發送好友請求到 Firebase
        await addDoc(collection(db, 'friendRequests'), {
            from: currentUser.uid,
            fromUserName: currentUserName,
            to: friendUid,
            toUserName: friendUserName,
            status: 'pending' 
        });

        setNewFriendName('');
        setErrorMessage(''); // 清除錯誤信息
    };

    // 從 Firebase 加載已接受的好友請求
    useEffect(() => {
        if (currentUser) {
            const loadFriends = async () => {
                const q = query(
                    collection(db, 'friendRequests'),
                    where('to', '==', currentUser.uid),
                    where('status', '==', 'accepted')
                );

                const querySnapshot = await getDocs(q);
                const loadedFriendsUids = [];
                querySnapshot.forEach((doc) => {
                    loadedFriendsUids.push(doc.data().from);
                });

                // 獲取好友的用戶名稱
                const loadedFriendsNames = [];
                for (const uid of loadedFriendsUids) {
                    const userDoc = await getDocs(query(collection(db, 'users'), where('uid', '==', uid)));
                    userDoc.forEach((doc) => {
                        loadedFriendsNames.push(doc.data().userName);
                    });
                }
                setFriends(loadedFriendsNames);
            };

            loadFriends();
        } else {
            setFriends([]);
        }
    }, [currentUser]);
    
    //TODO: 送出好友邀請成功訊息
    return (
        <div className={styles.column}>
            <div className={styles.item}>
                <input 
                    type="text"
                    value={newFriendName}
                    onChange={(e) => setNewFriendName(e.target.value)}
                    placeholder="輸入好友名稱"
                />

                <button onClick={handleAddFriend}>發送好友請求</button>
                {errorMessage && <p>{errorMessage}</p>}
            </div>
        </div>
    );
}