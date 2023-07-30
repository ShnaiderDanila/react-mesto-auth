import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { authApi } from '../utils/api';

function Login({setLoggedIn, setIsInfoTooltipOpen, setInfoTooltipSuccess}) {

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  function handleChange(evt) {
    setFormValue({ ...formValue, [evt.target.name]: evt.target.value })
  }

  // Функция обработки входа
  function handleLogin(evt) {
    evt.preventDefault();
    const { email, password } = formValue;
    authApi.authorize(email, password)
      .then((res) => {
        if(res.token) {
          // Очищаем инпуты
          setFormValue({
            email: '',
            password: ''
          })
          setLoggedIn(true);
          // Перенаправляем пользователя на главную страницу сайта
          navigate('/', {replace: true});
        }
      })
      .catch((err) => {
        // При получении ошибки от сервера, выводим её в консоль и открываем попап с ошибкой 
        console.error(`Ошибка: ${err}`);
        setInfoTooltipSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  }

  return (
    <section className="authentication">
      <h3 className="authentication__title">Вход</h3>
      <form className="authentication__form" onSubmit={handleLogin}>
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
        <button className="authentication__button" type="submit">Войти</button>
      </form>
    </section>
  )
}

export default Login