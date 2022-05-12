import { useState, useEffect, useContext } from 'react';
import { api } from '../utils/Api';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = useContext(CurrentUserContext);
  // const [userName, updateUserName] = useState('');
  // const [userDescription, updateUserDescription] = useState('');
  // const [userAvatar, updateUserAvatar] = useState('');
  const [cards, updateCards] = useState([]);

  useEffect(() => {
    return () => {
      api.getInitialCards()
        .then((cardList) => {
          updateCards(cardList);
          //console.log('cardList', cardList);
        })
        .catch(console.log);
    };
  }, []);

  // useEffect(() => {
  //   return () => {
  //     Promise.all([api.getProfile(), api.getInitialCards()])
  //       .then(([res, cardList]) => {
  //         updateUserName(res.name);
  //         updateUserDescription(res.about);
  //         updateUserAvatar(res.avatar);
  //         updateCards(cardList);
  //       })
  //       .catch(console.log);
  //   };
  // }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      updateCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  } 

  // function handleCardLike(dataCardClick) {
  //   // Снова проверяем, есть ли уже лайк на этой карточке
  //   const isLiked = dataCardClick.likes.some(elementLikesForDataCardClick => elementLikesForDataCardClick._id === currentUser._id);
    
  //   // Отправляем запрос в API и получаем обновлённые данные карточки
  //   api.changeLikeCardStatus(dataCardClick._id, !isLiked).then((newDataCard) => {
  //     updateCards((state) => state.map((dataCard) => dataCard._id === dataCardClick._id ? newDataCard : dataCard));
  //   });
  // } 

  function handleCardDelete(card) {
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.deleteCard(card._id).then(() => {
      updateCards((state) => state.filter((e) => e._id !== card._id));
    })
  }

  const cardsList = cards.map((card) =>
    <Card card={card} key={card._id} onCardClick={props.onCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>
  );

  return (
      currentUser &&
      <main>
        <section className="profile page__container">
          <div className="profile__info">
            <div className="profile__avatar" onClick={props.onEditAvatar}>
              {currentUser.avatar && (<img className="profile__image" src={currentUser.avatar} alt="Аватар" />)}
            </div>
            <div className="profile__name">
              <div className="profile__text">
                <h1 className="profile__title">{currentUser.name}</h1>
                <p className="profile__subtitle">{currentUser.about}</p>
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