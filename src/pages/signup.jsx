// src/pages/signup.js
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import styles from '../styles/login.module.css';
import { doc, setDoc, getFirestore } from 'firebase/firestore';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const db = getFirestore();

    const handleSignUp = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        setError('');

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 把註冊內容丟到 users資料庫內
            await setDoc(doc(db, "users", user.uid), {
                userName: userName,
                uid: user.uid
            });

            router.push('/login');
        } catch (error) {
            setError("請至少輸入6個英文或數字");
            console.error("Error signing up with email and password", error);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <form className={styles.form} onSubmit={handleSignUp}>
                <input className={styles.input}
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="User Name"
                />
                <input className={styles.input}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input className={styles.input}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button className={styles.submit} type="submit">註冊</button>
                {error && <div className={styles.errorMessage}>{error}</div>}
            </form>
            <img src="pic/man.png"></img>
        </div>
    );
};

export default SignUp;
