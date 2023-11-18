import React, { createContext, useState } from 'react';

export const FriendsContext = createContext();

export const FriendsProvider = ({ children }) => {
    const [friends, setFriends] = useState([]);
    const addFriend = (name) => {
        setFriends([...friends, { name }]);
    };

    // 根據 name 參數來刪除
    const removeFriend = (name) => {
        setFriends(friends.filter(friend => friend.name !== name));
    };

    // 通過 value 傳遞狀態跟方法
    return (
        <FriendsContext.Provider value={{ friends, addFriend, removeFriend }}>
            {children} {/* 渲染子组件 */}
        </FriendsContext.Provider>
    );
};
