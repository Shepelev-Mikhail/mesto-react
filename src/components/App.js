import { useState,useEffect } from 'react';
import { api } from '../utils/Api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [cards, updateCards] = useState([]);
  const [currentUser, updateCurrentUser] = useState(null);
  const [isEditProfilePopupOpen, updateIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, updateIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, updateIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, updateSelectedCard] = useState(null);

  useEffect(() => {
    return () => {
      api.getProfile()
        .then((res) => {
          updateCurrentUser(res);
        })
        .catch(console.log);
    };
  }, []);

  useEffect(() => {
    return () => {
      api.getInitialCards()
        .then((cardList) => {
          updateCards(cardList);
        })
        .catch(console.log);
    };
  }, []);

  //клик на аватар
  const handleEditAvatarClick = () => {
    updateIsEditAvatarPopupOpen(true);
  };

  //клик на редактирование профиля
  const handleEditProfileClick = () => {
    updateIsEditProfilePopupOpen(true);
  };

  //клик на создание карточки
  const handleAddPlaceClick = () => {
    updateIsAddPlacePopupOpen(true);
  };

  //клик на картику карточки
  const handleCardClick = (card) => {
    updateSelectedCard(card);
  };

  //клик на крестик
  const closeAllPopups = () => {
    if (isEditAvatarPopupOpen) {
      updateIsEditAvatarPopupOpen(false);
    }
    if (isEditProfilePopupOpen) {
      updateIsEditProfilePopupOpen(false);
    }
    if (isAddPlacePopupOpen) {
      updateIsAddPlacePopupOpen(false);
    }
    if (selectedCard) {
      updateSelectedCard(null);
    }
  };

  const handleUpdateUser = ({name, about}) => {
    api.editProfile(name, about)
    .then((res) => {
      updateCurrentUser(res);
      closeAllPopups();
    })
    .catch(console.log);
  }

  const handleUpdateAvatar = (avatar) => {
    api.updateAvatar(avatar)
    .then((res) => {
      updateCurrentUser(res);
      closeAllPopups();
    })
    .catch(console.log);
  }

  const handleCardLike = (card) => {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      updateCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  } 

  const handleCardDelete = (card) => {
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.deleteCard(card._id).then(() => {
      updateCards((state) => state.filter((e) => e._id !== card._id));
    })
  }

  const handleAddPlaceSubmit = ({name, link}) => {
    api.addCard(name, link)
    .then((res) => {
      updateCards([res, ...cards]);
      closeAllPopups();
    })
    .catch(console.log);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Header />
          <Main
            onCardClick={handleCardClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        </div>

        <div className="page__sticky-footer">
          <Footer />
        </div>

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
        {/* <PopupWithForm //попап создания новой карточки
          name="place"
          title="Новое место"
          buttonText="Создать"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <div className="popup__field">
            <input
              id="place-input"
              className="popup__input popup__input_type_place"
              type="text"
              name="name"
              placeholder="Название"
              value=""
              minLength="2"
              maxLength="30"
              required
              onChange={changeInput}
            />
            <span className="place-input-error popup__error"></span>
          </div>

          <div className="popup__field">
            <input
              id="link-input"
              className="popup__input popup__input_type_link"
              type="url"
              name="link"
              placeholder="Ссылка на картинку"
              value=""
              required
              onChange={changeInput}
            />
            <span className="link-input-error popup__error"></span>
          </div>
        </PopupWithForm> */}

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

        <PopupWithForm //попап подтверждения удаления 
          name="confirm"
          title="Вы уверены?"
          buttonText="Да"
        />

        <ImagePopup //попап просмотра
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>

  );
};

export default App;