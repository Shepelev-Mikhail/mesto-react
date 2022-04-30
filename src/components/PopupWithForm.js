function PopupWithForm(props) {
  
  // return(
  //   <>
  //     <div className="popup popup_profile">
  //       <div className="popup__container">
  //         <h2 className="popup__title">Редактировать профиль</h2>
  //         <form className="popup__form" method="post" name="popupForm" noValidate>

  //           <div className="popup__field">
  //             <input 
  //               id="name-input" 
  //               className="popup__input popup__input_type_name" 
  //               type="text" 
  //               name="name" 
  //               value=""
  //               minLength="2" 
  //               maxLength="40" 
  //               required 
  //               onChange={change1} 
  //             />
  //             <span className="name-input-error popup__error"></span>
  //           </div>
          
  //           <div className="popup__field">
  //             <input 
  //               id="description-input" 
  //               className="popup__input popup__input_type_description" 
  //               type="text"
  //               name="description" 
  //               value="" 
  //               minLength="2" 
  //               maxLength="200" 
  //               required 
  //               onChange={change1}
  //             />
  //             <span className="description-input-error popup__error"></span>
  //           </div>
          
  //           <button className="popup__submit" type="submit">Сохранить</button>
  //         </form>

  //         <button className="popup__close-button" type="button" aria-label="Закрыть"></button>
  //       </div>
  //     </div>

  //     <div className="popup popup_place">
  //       <div className="popup__container">
  //         <h2 className="popup__title">Новое место</h2>
  //         <form className="popup__form" method="post" name="popupForm" noValidate>

  //           <div className="popup__field">
  //             <input 
  //               id="place-input" 
  //               className="popup__input popup__input_type_place" 
  //               type="text" 
  //               name="name"
  //               placeholder="Название" 
  //               value="" minLength="2" 
  //               maxLength="30" 
  //               required 
  //               onChange={change1}
  //             />
  //             <span className="place-input-error popup__error"></span>
  //           </div>

  //           <div className="popup__field">
  //             <input 
  //               id="link-input" 
  //               className="popup__input popup__input_type_link" 
  //               type="url" 
  //               name="link"
  //               placeholder="Ссылка на картинку" 
  //               value="" 
  //               required 
  //               onChange={change1}
  //             />
  //             <span className="link-input-error popup__error"></span>
  //           </div>

  //           <button className="popup__submit" type="submit">Создать</button>
  //         </form>

  //         <button className="popup__close-button" type="button" aria-label="Закрыть"></button>
  //       </div>
  //     </div>

  //     <div className="popup popup_update-avatar">
  //       <div className="popup__container">
  //         <h2 className="popup__title">Обновить аватар</h2>
  //         <form className="popup__form" name="popupForm" noValidate>

  //           <div className="popup__field">
  //             <input 
  //               id="avatar-input" 
  //               className="popup__input popup__input_type_link" 
  //               type="url" 
  //               name="link"
  //               placeholder="Ссылка на картинку" 
  //               value="" 
  //               required 
  //               onChange={change1}
  //             />
  //             <span className="avatar-input-error popup__error"></span>
  //           </div>

  //           <button className="popup__submit" type="submit">Сохранить</button>
  //         </form>

  //         <button className="popup__close-button" type="button" aria-label="Закрыть"></button>
  //       </div>
  //     </div>

  //     <div className="popup popup_confirm">
  //       <div className="popup__container">
  //         <h2 className="popup__title">Вы уверены?</h2>
  //         <form className="popup__form" name="popupForm" noValidate>
  //           <button className="popup__submit popup__submit_confirm" type="submit">Да</button>
  //         </form>

  //         <button className="popup__close-button" type="button" aria-label="Закрыть"></button>
  //       </div>
  //     </div>
  //   </>
  // )
  return(
    <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form" method="post" name={props.name} noValidate>
          {props.children}

          <button className="popup__submit" type="submit">{props.nameSubmit}</button>
        </form>

        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
      </div>
    </div>
  )
};

export default PopupWithForm;