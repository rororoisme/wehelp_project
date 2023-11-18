import {PomodoroProvider} from '../components/PomodoroContext';
import { AuthProvider } from '../components/AuthContext';
import {app} from '../firebase/firebaseConfig';

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <PomodoroProvider>
                <Component {...pageProps} />
            </PomodoroProvider>
        </AuthProvider>
    );
}

export default MyApp;
