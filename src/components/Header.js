import {useContext} from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { CurrentLoggedInContext } from '../contexts/CurrentLoggedInContext';
import headerLogo from '../images/logo.svg';

function Header(props) {
  const location = useLocation();
  const currentLoggedIn = useContext(CurrentLoggedInContext);
 
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={headerLogo} alt="Логотип Место России" />
      </Link>
      <nav className="menu">
        {
          (currentLoggedIn === true) ? (
            <div className="header__navigation">
              <p className="header__user-email">{props.userEmail}</p>
              <button className="header__link-out" onClick={props.signOut}>Выйти</button> 
            </div>
          ) : (location.pathname === '/sign-in') ? ( 
            <NavLink className="header__link" to="/sign-up">Регистрация</NavLink>
          ) : (location.pathname === '/sign-up') ? (
            <NavLink className="header__link" to="/sign-in">Войти</NavLink>
          ) : ('')
        } 
      </nav>
    </header>
  );
}
export default Header;