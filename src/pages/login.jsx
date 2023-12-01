import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import styles from '../styles/login.module.css';
import Link from 'next/link';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        setError('');

        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/main');
        } catch (error) {
            setError("查無此帳號，請先");
            console.error("Error signing in with email and password", error);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <img src="pic/big.png"></img>
            <form className={styles.form} onSubmit={handleLogin}>
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
                <button className={styles.submit} type="submit">登入</button>
                <p className={styles.loginMessage}>還沒有帳號嗎？點此<Link href="/signup">註冊</Link></p>
                {error && <div className={styles.errorMessage}>{error}<Link href="/signup">註冊</Link></div>}
            </form>
        </div>
    );
};

export default Login;
