import React from 'react';
import { useState } from 'react';

function InfoUserAuthForm(props) {
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
    props.handleAuth(email, password);
  }
      
  return (
    <form className="register__form" name="registerForm" onSubmit={handleSubmit}>
      <h2 className="register__title">{props.title}</h2>
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
      <button className="register__sign-up-btn" type="submit">{props.buttonName}</button>
    </form>
  )
}

export default InfoUserAuthForm;