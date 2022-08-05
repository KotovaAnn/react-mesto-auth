import React from 'react';
import InfoUserAuthForm from './InfoUserAuthForm';

function Login(props) {
  
  return (
    <div className="content">
      <div className="login">
        <div className="login__content">
          <InfoUserAuthForm
            handleAuth={props.handleLogin}
            title="Войти"
            buttonName="Войти"
            />
        </div>
      </div>
    </div>
  )
}

export default Login;