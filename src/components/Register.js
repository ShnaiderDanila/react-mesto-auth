import { Link } from 'react-router-dom';

function Register() {
  return (
    <section className="authentication">
      <h3 className="authentication__title">Регистрация</h3>
      <form className="authentication__form">
        <label className="authentication__form-field">
          <input
            className="authentication__input"
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            required />
        </label>
        <label className="authentication__form-field">
          <input
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