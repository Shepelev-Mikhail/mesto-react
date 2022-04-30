import { useState, useEffect } from 'react';
import { api } from '../utils/Api';
import Card from './Card';

function Main(props) {
  const [userName, updateUserName] = useState();
  const [userDescription, updateUserDescription] = useState();
  const [userAvatar, updateUserAvatar] = useState();
  const [cards, updateCards] = useState([]);

  useEffect(() => {
    return () => {
      Promise.all([api.getProfile(), api.getInitialCards()])
        .then(([res, cardList]) => {
          updateUserName(res.name);
          updateUserDescription(res.about);
          updateUserAvatar(res.avatar);
          updateCards(cardList);
        })
        .catch(console.log);
    };
  }, []);

  const cardsList = cards.map((card) =>
    <Card card={card} key={card._id} onCardClick={props.onCardClick} />
  );

  return (
    <main>
      <section className="profile page__container">
        <div className="profile__info">
          <div className="profile__avatar" onClick={props.onEditAvatar}>
            <img className="profile__image" src={userAvatar} alt="Аватар" />
          </div>
          <div className="profile__name">
            <div className="profile__text">
              <h1 className="profile__title">{userName}</h1>
              <p className="profile__subtitle">{userDescription}</p>
            </div>
            <button
              className="profile__edit-button"
              type="button"
              aria-label="Редактировать"
              title="Редактировать"
              onClick={props.onEditProfile}
            />
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить"
          title="Добавить"
          onClick={props.onAddPlace}
        />
      </section>

      <section>
        <ul className="gallery page__container">
          {cardsList}
        </ul>
      </section>
    </main>
  );
};

export default Main;