import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { authApi } from '../utils/api';

function Register({ setIsInfoTooltipOpen, setInfoTooltipSuccess }) {

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  function handleChange(evt) {
    setFormValue({ ...formValue, [evt.target.name]: evt.target.value })
  }

  function handleRegister(evt) {
    evt.preventDefault();
    const { email, password } = formValue;
    authApi.register(email, password)
      .then(() => {
         // При получении успешного ответа от сервера, открываем попап с оповещением
        setInfoTooltipSuccess(true);
        setIsInfoTooltipOpen(true);
        // Перенаправляем пользователя на страницу входа
        navigate('/sign-in', { replace: true });
      })
      .catch((err) => {
        // При получении ошибки от сервера, выводим её в консоль и открываем попап с ошибкой 
        console.error(`Ошибка: ${err}`);
        setInfoTooltipSuccess(false);
        setTimeout(() => {
          setIsInfoTooltipOpen(true);
        }, 500)
      });
  }

  return (
    <section className="authentication">
      <h3 className="authentication__title">Регистрация</h3>
      <form className="authentication__form" onSubmit={handleRegister}>
        <label className="authentication__form-field">
          <input
            onChange={handleChange}
            value={formValue.email}
            className="authentication__input"
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            required />
        </label>
        <label className="authentication__form-field">
          <input
            onChange={handleChange}
            value={formValue.password}
            className="authentication__input"
            id="password"
            type="password"
            name="password"
            placeholder="Пароль"
            required />
        </label>
        <button className="authentication__button" type="submit">Зарегистрироваться</button>
        <p className="authentication__text">Уже зарегистрированы? <Link className="authentication__link" to="/sign-in">Войти</Link></p>
      </form>
    </section>
  )
}

export default Register