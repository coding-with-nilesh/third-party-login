import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;// Reading google client id from .env file

function App() {

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
        />}

        <GoogleAuth/>
    </div>
  );
}

export default App;



// Add    <script src='https://apis.google.com/js/api.js'></script> in index.html
class GoogleAuth extends React.Component {
  state = {
    isSignedIn: null
  }

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: clientId,
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance()
        this.setState({ isSignedIn: this.auth.isSignedIn.get() })
        this.auth.isSignedIn.listen(this.onAuthChange)
      })
    })
  }

  onSignInClick=()=>{
    this.auth.signIn()
    }
    onSignOutClick=()=>{
    this.auth.signOut()
    }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() })
  }
  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null
    } else if (this.state.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className='ui red google button'>
          <i className='google icon' />
          Sign Out
        </button>
      )
    } else {
      return (
        <button onClick={this.onSignInClick} className='ui red google button'>
          <i className='google icon' />
          Sign In with Google
        </button>
      )
    }
  }
  render() {
    return <div>{this.renderAuthButton()}</div>
  }
}