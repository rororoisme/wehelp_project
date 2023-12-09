import React, { useEffect, useContext } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { FriendsContext } from './FriendsContext';
import styles from '../styles/home.module.css';

export default function FriendsRequest() {
    const { friends, setFriends, currentUser } = useContext(FriendsContext);

        // 從 Firebase 加載已接受的好友請求
        useEffect(() => {
            if (currentUser) {
                const loadFriends = async () => {
                    const loadedFriends = []; // 改为保存一个包含 ID 和用户名的对象数组
                    const q1 = query(
                        collection(db, 'friendRequests'),
                        where('to', '==', currentUser.uid),
                        where('status', '==', 'accepted')
                    );
        
                    const querySnapshot1 = await getDocs(q1);
                    querySnapshot1.forEach((doc) => {
                        loadedFriends.push({ uid: doc.data().from });
                    });
        
                    const q2 = query(
                        collection(db, 'friendRequests'),
                        where('from', '==', currentUser.uid),
                        where('status', '==', 'accepted')
                    );
        
                    const querySnapshot2 = await getDocs(q2);
                    querySnapshot2.forEach((doc) => {
                        loadedFriends.push({ uid: doc.data().to });
                    });
        
                    // 获取好友的用户名
                    for (const friend of loadedFriends) {
                        const userDoc = await getDocs(query(collection(db, 'users'), where('uid', '==', friend.uid)));
                        userDoc.forEach((doc) => {
                            friend.userName = doc.data().userName; // 保存用户名
                        });
                    }
                    setFriends(loadedFriends); // 更新状态
                };
        
                loadFriends();
            } else {
                setFriends([]);
            }
        }, [currentUser]);
        
        // 渲染好友列表
        return (
            <div className={styles.column}>
                <div className={styles.itemFriends}>
                    <h3 className={styles.itemsTitle}>好友名單</h3>
                    <ul>
                        {friends.map((friend, index) => (
                            <li class={styles.list} key={index}>
                                <a class={styles.listItems} href={`/calendar/${friend.uid}`}>{friend.userName}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }