import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';


function Register(props) {
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
    props.handleRegistration(email, password);
  }
  
  return (
    <div className="content">
      <div className="register">
        <div className="register__content">
          <form className="register__form" name="registerForm" onSubmit={handleSubmit}>
            <h2 className="register__title">Регистрация</h2>
            <input
              id="register-email-input"
              className="register__form-item register__form-item_input_email"
              required
              type="email"
              name="registerInputEmail"
              placeholder="E-mail"
              value={email}
              onChange={handleEmailChange}
              />
            <input
              id="register-password-input"
              className="register__form-item register__form-item_input_password"
              required
              type="password"
              name="registerInputPassoword"
              placeholder="Пароль"
              value={password}
              onChange={handlePasswordChange}
              />
            <button className="register__sign-up-btn" type="submit" >Зарегистрироваться</button>
          </form>
          <Link to="/sign-in" className="register__link">Уже зарегистрированы? Войти</Link>
        </div>
      </div>
    </div>
  )
}
export default Register;