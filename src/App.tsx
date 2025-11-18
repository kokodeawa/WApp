import React, { useState } from 'react';
import { LoginView } from './components/LoginView';
import { MainApp } from './MainApp';

const App: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<string | null>(() => {
        // Check session storage first to keep user logged in during the session
        return window.sessionStorage.getItem('financial-organizer-currentUser');
    });

    const handleLogin = (username: string) => {
        window.sessionStorage.setItem('financial-organizer-currentUser', username);
        setCurrentUser(username);
    };

    const handleLogout = () => {
        window.sessionStorage.removeItem('financial-organizer-currentUser');
        setCurrentUser(null);
    };
    
    return (
        <>
            {!currentUser ? (
                <LoginView onLogin={handleLogin} />
            ) : (
                <MainApp currentUser={currentUser} onLogout={handleLogout} />
            )}
        </>
    );
};

export default App;
