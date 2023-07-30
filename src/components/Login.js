import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { authApi } from '../utils/api';
import AuthForm from './AuthForm';

function Login({ setLoggedIn, setIsInfoTooltipOpen, setInfoTooltipSuccess }) {

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
        if (res.token) {
          // Очищаем инпуты
          setFormValue({
            email: '',
            password: ''
          })
          setLoggedIn(true);
          // Перенаправляем пользователя на главную страницу сайта
          navigate('/', { replace: true });
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
    <AuthForm
      authTitle={'Вход'}
      authButtonText={'Войти'}
      handleSubmit={handleLogin}
      handleChange={handleChange}
      formValue={formValue} />
  )
}

export default Login