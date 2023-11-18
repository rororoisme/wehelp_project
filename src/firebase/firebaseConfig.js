import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAG1sAUtwPK57c9NKd3vp2bB4pyonzXu04",
    authDomain: "project-9efe1.firebaseapp.com",
    projectId: "project-9efe1",
    storageBucket: "project-9efe1.appspot.com",
    messagingSenderId: "407595511897",
    appId: "1:407595511897:web:c574f217c46861a2b9c148",
    measurementId: "G-D02RXCG4FP"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
export { app };