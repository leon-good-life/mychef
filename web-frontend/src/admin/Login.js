import React from 'react';
import GoogleLogin from 'react-google-login';

const Login = ({handleGoogleLogin}) => {
  return (
    <div className="admin-container">
      <GoogleLogin
        clientId="377161177382-bqradjn2qablmfso34dcnkrtd31gs25m.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={handleGoogleLogin}
        onFailure={handleGoogleLogin}
        isSignedIn={true}
        className="google-login" />
    </div>
  );
};

export default Login;