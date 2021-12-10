import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;// Reading google client id from .env file

function App() {
  return (
    <GoogleLoginExample />
  );

}

export default App;

function GoogleLoginExample() {
  const [loading, setLoading] = useState('Loading...');
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (response) => {
    console.log("Login Success ", response);
    setUser(response.profileObj);
    setLoading();
  }

  const handleLoginFailure = error => {
    console.log("Login Failure ", error);
    setLoading();
  }

  const handleLogoutSuccess = (response) => {
    console.log("Logout Success ", response);
    setUser(null);
  }

  const handleLogoutFailure = error => {
    console.log("Logout Failure ", error);
  }

  const handleRequest = () => {
    setLoading("Loading...");
  }

  const handleAutoLoadFinished = () => {
    setLoading();
  }

  return (
    <div>
      <h3>Login with Google</h3>
      {user ? <div>
        <div className="name">Welcome {user.name}!</div>
        <GoogleLogout
          clientId={clientId}
          onLogoutSuccess={handleLogoutSuccess}
          onFailure={handleLogoutFailure}
        />
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div> :
        <GoogleLogin
          clientId={clientId}
          buttonText={loading}
          onSuccess={handleLoginSuccess}
          onFailure={handleLoginFailure}
          onRequest={handleRequest}
          onAutoLoadFinished={handleAutoLoadFinished}
          isSignedIn={true}
          style={{ marginTop: '100px', color: 'red' }}
        />}

      {/* Using Hooks */}
      {/* <LoginGoogleUsingHook /> */}
      {/* <GoogleAuth /> */}
    </div>
  );
}
