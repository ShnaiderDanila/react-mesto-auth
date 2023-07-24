import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

function Header({linkName, routeName}) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип проекта - Место Россия" />
      <Link to={`/${routeName}`} className="header__link" >{linkName}</Link>
    </header>
  )
}

export default Header;