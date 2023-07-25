function Login() {
  return (
    <section className="authentication">
      <h3 className="authentication__title">Вход</h3>
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
        <button className="authentication__button" type="submit">Войти</button>
      </form>
    </section>
  )
}

export default Login