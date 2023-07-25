import registerSuccess from '../images/register-success.svg';  // Импортируем изображение успешной регистрации
import registreFail from '../images/register-fail.svg';

function InfoTooltip({ isOpen, onClose }) {
  return (
    <div className={`popup ${isOpen ? 'popup_is-opened' : ''}`}>
      <div className="info-tooltip">
        <img className="info-tooltip__image" src={registerSuccess} alt='Информационная всплывающая подсказка' />
        <h3 className="info-tooltip__title">Вы успешно зарегистрировались!</h3>
        <button onClick={onClose} className="popup__button-close" type="button" />
      </div>
    </div>
  )
}

export default InfoTooltip