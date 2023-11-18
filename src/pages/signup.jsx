// src/pages/signup.js
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSignUp = async (e) => {
        e.preventDefault();
        const auth = getAuth();

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            router.push('/login');
        } catch (error) {
            console.error("Error signing up with email and password", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSignUp}>
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
                <button type="submit">註冊</button>
            </form>
        </div>
    );
};

export default SignUp;
