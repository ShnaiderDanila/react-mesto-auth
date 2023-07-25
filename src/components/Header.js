import logo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип проекта - Место Россия" />
      {location.pathname === "/sign-in" && <Link className="header__link" to="/sign-up">Регистрация</Link> }
      {location.pathname === "/sign-up" && <Link className="header__link" to="/sign-in">Вход</Link> }
      {location.pathname === "/" && <Link className="header__link" to="/sign-in">Выход</Link> }
    </header>
  )
}

export default Header;