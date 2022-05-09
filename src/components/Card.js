import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  //console.log('card', card);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `card__delete-button ${isOwn ? 'style={{display: visible}}' : 'style={{display: none}}'}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `card__like ${isLiked ? 'card__like_active' : ''}`
  );

  const handleLikeClick = () => {
    onCardLike(card);
  }

  const handleClick = () => {
    onCardClick(card);
  }
  
  return (
    <li className="card">
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__likes">
          <button className="card__like" type="button" aria-label="Нравится" onClick={handleLikeClick}>
          </button>
          <span className="card__like-counter">{card.likes.length}</span>
        </div>
      </div>
      <button style={{display: isOwn ? 'visible' : 'none'}} className="card__delete" type="button" aria-label="Удалить">
      </button>
    </li>
  );
};

export default Card;