import React, { useContext, useState } from 'react';
import { FriendsContext } from './FriendsContext';
import styles from '../styles/friends.module.css';

export default function FriendsList() {
    const { friends, addFriend, removeFriend } = useContext(FriendsContext);
    // 綁定輸入內容的狀態
    const [newFriendName, setNewFriendName] = useState('');

    const handleAddFriend = () => {
        // 先添加好友(輸入框的值)
        // 再重置輸入內容
        addFriend(newFriendName);
        setNewFriendName('');
    };

    return (
        <div>
            <input className={styles.input}
                type="text"
                value={newFriendName}
                onChange={(e) => setNewFriendName(e.target.value)}
                placeholder="輸入好友名稱"
            />
            <button onClick={handleAddFriend} className={styles.btn}>添加</button>
            <ul>
                {friends.map((friend, index) => (
                    <li key={index}>
                        {friend.name}
                        <button onClick={() => removeFriend(friend.name)} className={styles.btn}>移除</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
