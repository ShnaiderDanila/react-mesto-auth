import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../images/logo.svg';

function Header({ loggedIn, setLoggedIn, userEmail }) {

  const location = useLocation();
  const [headerMenuIsActive, setHeaderMenuIsActive] = useState(false);
  const navigate = useNavigate();

  // Функция открытия и закрытия бургер-меню
  function handleHeaderMenu() {
    setHeaderMenuIsActive(!headerMenuIsActive);
  }

  // Функция обработки выхода
  function handleSignOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/sign-in', { replace: true });
  }

  return (
    <header className="header">
      {
        headerMenuIsActive && location.pathname === "/" &&
        <div className='header__menu-container'>
          <p className="header__email">{userEmail}</p>
          <button
            onClick={handleSignOut}
            className='header__sign-out'
            type="button">Выйти</button>
        </div>
      }
      <div className='header__container'>
        <img className="header__logo" src={logo} alt="Логотип проекта - Место Россия" />
        {
          loggedIn ?
            <>
              {location.pathname === "/" &&
                <>
                  <nav className='header__nav'>
                    <p className="header__email">{userEmail}</p>
                    <button
                      onClick={handleSignOut}
                      className='header__sign-out'
                      type="button">Выйти</button>
                  </nav>
                  <button
                    onClick={handleHeaderMenu}
                    type='button'
                    className={`header__menu-button ${headerMenuIsActive && 'header__menu-button_is-active'}`} />
                </>
              }
            </>
            :
            <>
              {location.pathname === "/sign-in" && <Link className="header__link" to="/sign-up">Регистрация</Link>}
              {location.pathname === "/sign-up" && <Link className="header__link" to="/sign-in">Вход</Link>}
            </>
        }
      </div>
    </header>
  )
}

export default Header;