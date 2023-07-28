// Импортируем иконки
import iconSuccess from '../images/icon-success.svg';
import iconFail from '../images/icon-fail.svg';

function InfoTooltip({ isOpen, onClose, infoTooltipSuccess }) {
  return (
    <div className={`popup ${isOpen ? 'popup_is-opened' : ''}`}>
      <div className="info-tooltip">
        <img
          className="info-tooltip__image"
          src={`${infoTooltipSuccess ? iconSuccess : iconFail}`}
          alt='Информационная всплывающая подсказка' />
        <h3 className="info-tooltip__title">
          {`${infoTooltipSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}`}</h3>
        <button onClick={onClose} className="popup__button-close" type="button" />
      </div>
    </div>
  )
}

export default InfoTooltip