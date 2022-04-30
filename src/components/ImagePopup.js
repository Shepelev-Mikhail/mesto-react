function ImagePopup(props) {
  const link = props.card?.link ? props.card.link : '#';
  const name = props.card?.name ? props.card.name : '';

  return(
    <div className={`popup popup_view-image ${props.card ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_img">
        <img className="popup__image" src={link} alt="" />
        <h2 className="popup__caption">{name}</h2>
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
      </div>
    </div>
  )
};

export default ImagePopup;