import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const inputValueRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmitButton();
    props.onUpdateAvatar({
      avatar: inputValueRef.current.value,
    });
  }

  useEffect(() => {
    inputValueRef.current.value = "";
  }, [props.isOpen]);

  return <PopupWithForm 
    title="Обновить аватар" 
    name="edit-avatar" 
    buttonName={props.renderLoading}
    isOpen={props.isOpen} 
    onClose={props.onClose}
    onSubmit={handleSubmit}
  >
    <input
      id="avatar-link-input"
      className="popup__form-item popup__form-item_input_link-avatar"
      required
      type="url"
      name="inputLinkAvatar"
      placeholder="Ссылка на аватар"
      ref={inputValueRef}
    />
    <span 
      className="popup__error popup__error_type_link-input-error popup__error_edit-avatar" 
      id="avatar-link-input-error"
    >
    </span>

  </PopupWithForm>  
}

export default EditAvatarPopup;