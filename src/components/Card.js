function Card(props) {
  const { card } = props;
  
  return(
    <li className="card">
      <img 
        className="card__image"
        src={card.link}
        alt={card.name} 
        onClick={() => {
          props.onCardClick(card);
        }}
      />
      <div className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__likes">
          <button className="card__like" type="button" aria-label="Нравится">
          </button>
          <span className="card__like-counter">{card.likes.length}</span>
        </div>
      </div>
      <button className="card__delete" type="button" aria-label="Удалить">
      </button>
    </li>
  )
}

export default Card;