import { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, updateIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, updateIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, updateIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, updateSelectedCard] = useState(null);

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

  //изменение инпута
  const changeInput = () => {
    console.log('что-то изменилось')
  };

  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <Main
          onCardClick={handleCardClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
        />
      </div>

      <div className="page__sticky-footer">
        <Footer />
      </div>

      <PopupWithForm //попап редактирования профиля
        name={'profile'}
        title={'Редактировать профиль'}
        nameSubmit={'Сохранить'}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <div className="popup__field">
          <input
            id="name-input"
            className="popup__input popup__input_type_name"
            type="text"
            name="name"
            value=""
            minLength="2"
            maxLength="40"
            required
            onChange={changeInput}
          />
          <span className="name-input-error popup__error"></span>
        </div>

        <div className="popup__field">
          <input
            id="description-input"
            className="popup__input popup__input_type_description"
            type="text"
            name="description"
            value=""
            minLength="2"
            maxLength="200"
            required
            onChange={changeInput}
          />
          <span className="description-input-error popup__error"></span>
        </div>
      </PopupWithForm>

      <PopupWithForm //попап создания новой карточки
        name={'place'}
        title={'Новое место'}
        nameSubmit={'Создать'}
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
      </PopupWithForm>

      <PopupWithForm //попап аватара
        name={'update-avatar'}
        title={'Обновить аватар'}
        nameSubmit={'Сохранить'}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <div className="popup__field">
          <input
            id="avatar-input"
            className="popup__input popup__input_type_link"
            type="url"
            name="link"
            placeholder="Ссылка на картинку"
            value=""
            required
            onChange={changeInput}
          />
          <span className="avatar-input-error popup__error"></span>
        </div>
      </PopupWithForm>

      <PopupWithForm //попап подтверждения удаления 
        name={'confirm'}
        title={'Вы уверены?'}
        nameSubmit={'Да'}
      />

      <ImagePopup //попап просмотра
        card={selectedCard}
        onClose={closeAllPopups}
      />
    </div>
  );
};

export default App;