// src/utils/auth.js
import { getAuth, signOut } from 'firebase/auth';

export const logout = async () => {
    const auth = getAuth();
    await signOut(auth);
};
