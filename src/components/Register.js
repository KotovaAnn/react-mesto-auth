import React from 'react';
import { Link } from 'react-router-dom';
import InfoUserAuthForm from './InfoUserAuthForm';

function Register(props) {

  return (
    <div className="content">
      <div className="register">
        <div className="register__content">
          <InfoUserAuthForm
            handleAuth={props.handleRegistration}
            title="Регистрация"
            buttonName="Регистрация"
            />
          <Link to="/sign-in" className="register__link">Уже зарегистрированы? Войти</Link>
        </div>
      </div>
    </div>
  )
}
export default Register;