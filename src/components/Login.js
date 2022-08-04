import React from 'react';
import { useState } from 'react';

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  
  function handleSubmit(evt) {
    evt.preventDefault();
    props.handleLogin(email, password);
  }

  return (
    <div className="content">
      <div className="login">
        <div className="login__content">
          <form className="login__form" name="loginForm" onSubmit={handleSubmit}>
            <h2 className="login__title">Вход</h2>
            <input
              id="login-email-input"
              className="login__form-item login__form-item_input_email"
              required
              type="email"
              name="loginInputEmail"
              placeholder="E-mail"
              value={email}
              onChange={handleEmailChange}
              />
            <input
              id="login-password-input"
              className="login__form-item login__form-item_input_password"
              required
              type="password"
              name="loginInputPassoword"
              value={password}
              onChange={handlePasswordChange}
              />
            <button className="login__sign-in-btn" type="submit">Войти</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;