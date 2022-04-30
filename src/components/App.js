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

  const handleEditAvatarClick = () => {
    updateIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {  
    updateIsEditProfilePopupOpen(true);
  }
  
  const handleAddPlaceClick = () => {
    updateIsAddPlacePopupOpen(true);
  }

  const handleCardClick = (card) => {
    updateSelectedCard(card);
  }

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
  }

  const change1 = () => {
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

      <PopupWithForm name={'profile'} title={'Редактировать профиль'} nameSubmit={'Сохранить'} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
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
            onChange={change1} 
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
            onChange={change1}
          />
          <span className="description-input-error popup__error"></span>
        </div>
      </PopupWithForm>

      <PopupWithForm name={'place'} title={'Новое место'} nameSubmit={'Создать'} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
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
            onChange={change1}
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
            onChange={change1}
          />
          <span className="link-input-error popup__error"></span>
        </div>
      </PopupWithForm>
      
      <PopupWithForm name={'update-avatar'} title={'Обновить аватар'} nameSubmit={'Сохранить'} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <div className="popup__field">
          <input 
            id="avatar-input" 
            className="popup__input popup__input_type_link" 
            type="url" 
            name="link"
            placeholder="Ссылка на картинку" 
            value="" 
            required 
            onChange={change1}
          />
          <span className="avatar-input-error popup__error"></span>
        </div>
      </PopupWithForm>

      <PopupWithForm name={'confirm'} title={'Вы уверены?'} nameSubmit={'Да'} />

      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

      <template className="template">
        <li className="card">
          <img className="card__image" src="#" alt="" />
          <div className="card__info">
            <h2 className="card__title"></h2>
            <div className="card__likes">
              <button className="card__like" type="button" aria-label="Нравится">
              </button>
              <span className="card__like-counter"></span>
            </div>
          </div>
          <button className="card__delete" type="button" aria-label="Удалить">
          </button>
        </li>
      </template>
    </div>
  );
}

export default App;
