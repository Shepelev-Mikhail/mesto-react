export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const popupProfile = document.querySelector('.popup_profile');
export const popupProfileForm = popupProfile.querySelector('.popup__form');
export const saveProfileButton = popupProfileForm.querySelector('.popup__submit');

const popupPlace = document.querySelector('.popup_place');
export const popupPlaceForm = popupPlace.querySelector('.popup__form');
export const createCardButton = popupPlaceForm.querySelector('.popup__submit');

const popupAvatar = document.querySelector('.popup_update-avatar');
export const popupAvatarForm = popupAvatar.querySelector('.popup__form');
export const saveAvatarButton = popupAvatarForm.querySelector('.popup__submit');

export const editProfile = document.querySelector('.profile__edit-button');
export const addPlace = document.querySelector('.profile__add-button');
export const avatarIcon = document.querySelector('.profile__avatar');