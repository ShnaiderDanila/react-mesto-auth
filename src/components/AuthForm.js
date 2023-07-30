function AuthForm({ authTitle, authButtonText, handleSubmit, handleChange, formValue, children }) {
  return (
    <section className="authentication">
      <h3 className="authentication__title">{authTitle}</h3>
      <form className="authentication__form" onSubmit={handleSubmit}>
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
        <button className="authentication__button" type="submit">{authButtonText}</button>
        {children}
      </form>
    </section>
  )
}

export default AuthForm