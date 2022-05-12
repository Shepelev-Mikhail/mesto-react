import { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
  const [name, changeName] = useState('');
  const [description, changeDescription] = useState('');

  function handleChangeName(e) {
    changeName(e.target.value);
  }

  function handleChangeDescription(e) {
    changeDescription(e.target.value);
  }

  return (
    <PopupWithForm //попап редактирования профиля
    name="profile"
    title="Редактировать профиль"
    buttonText="Сохранить"
    isOpen={props.isOpen}
    onClose={props.onClose}
    >
      <div className="popup__field">
        <input
          id="name-input"
          className="popup__input popup__input_type_name"
          type="text"
          name="name"
          value={name}
          minLength="2"
          maxLength="40"
          required
          onChange={handleChangeName}
        />
        <span className="name-input-error popup__error"></span>
      </div>

      <div className="popup__field">
        <input
          id="description-input"
          className="popup__input popup__input_type_description"
          type="text"
          name="description"
          value={description}
          minLength="2"
          maxLength="200"
          required
          onChange={handleChangeDescription}
        />
        <span className="description-input-error popup__error"></span>
      </div>
    </PopupWithForm>
  );
};

export default EditProfilePopup;