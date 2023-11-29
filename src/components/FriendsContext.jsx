import React, { createContext, useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';

// 創建一個 context 對象
export const FriendsContext = createContext();

export const FriendsProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [friends, setFriends] = useState([]);

    // 監聽用戶的登錄狀態
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                setCurrentUser(null);
            }
        });
        return unsubscribe; // 清理訂閱
    }, []);

    // 從 Firebase 加載好友
    useEffect(() => {
        if (!currentUser) {
            setFriends([]);
            return;
        }

        const loadFriends = async () => {
            const q = query(collection(db, 'friendRequests'), where('to', '==', currentUser.uid), where('status', '==', 'accepted'));
            const querySnapshot = await getDocs(q);
            const loadedFriends = [];
            querySnapshot.forEach((doc) => {
                loadedFriends.push(doc.data().from); // 添加發送請求的用戶的 UID
            });
            setFriends(loadedFriends);
        };

        loadFriends();
    }, [currentUser]);

    return (
        <FriendsContext.Provider value={{ currentUser, friends, setFriends }}>
            {children}
        </FriendsContext.Provider>
    );
};
