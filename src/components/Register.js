import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { authApi } from '../utils/api';
import AuthForm from './AuthForm';

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
    <AuthForm
      authTitle={'Регистрация'}
      authButtonText={'Зарегистрироваться'}
      handleSubmit={handleRegister}
      handleChange={handleChange}
      formValue={formValue}>
      <p className="authentication__text">Уже зарегистрированы? <Link className="authentication__link" to="/sign-in">Войти</Link></p>
    </AuthForm>
  )
}

export default Register