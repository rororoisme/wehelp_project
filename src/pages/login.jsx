// src/pages/login.js
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        const auth = getAuth();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/');
        } catch (error) {
            console.error("Error signing in with email and password", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit">登入</button>
            </form>
        </div>
    );
};

export default Login;
