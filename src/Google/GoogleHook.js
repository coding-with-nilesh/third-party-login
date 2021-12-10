import React from 'react';
import { useGoogleLogin, useGoogleLogout } from 'react-google-login';
import { refreshToken } from './hooks/refresh-token';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;// Reading google client id from .env file

export function LoginGoogleUsingHook() {
    const onSuccess = (res) => {
        console.log('Login Success: currentUser:', res.profileObj);
        refreshToken(res);
    };

    const onFailure = (res) => {
        console.log('Login failed: res:', res);
    };

    const { signIn } = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId,
        isSignedIn: true,
        accessType: 'offline',
    });

    return (
        <button onClick={signIn} className="button">
            <span className="buttonText">Sign in with Google</span>
        </button>
    );
}

function LogoutGoogleUsingHook() {
    const onLogoutSuccess = (res) => {
        console.log('Logged out Success');
        alert('Logged out Successfully ✌');
    };

    const onFailure = () => {
        console.log('Handle failure cases');
    };

    const { signOut } = useGoogleLogout({
        clientId,
        onLogoutSuccess,
        onFailure,
    });

    return (
        <button onClick={signOut} className="button">
            <img src="icons/google.svg" alt="google login" className="icon"></img>

            <span className="buttonText">Sign out</span>
        </button>
    );
}

export default LogoutGoogleUsingHook;