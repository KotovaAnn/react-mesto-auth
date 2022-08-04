import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup (props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);
  
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSubmitButton();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return <PopupWithForm 
    title="Редактировать профиль" 
    name="profile-popup" 
    buttonName={props.renderLoading} 
    isOpen={props.isOpen}
    onClose={props.onClose}
    onSubmit={handleSubmit}
  >
    <input
      id="name-input"
      className="popup__form-item popup__form-item_input_name"
      required
      type="text"
      name="inputName"
      placeholder="Имя"
      minLength={2}
      maxLength={40}
      onChange={handleNameChange}
      value={name || ""}
    />
    <span className="popup__error popup__error_type_name-input-error" id="name-input-error"></span>
    <input
      id="aboutself-input"
      className="popup__form-item popup__form-item_input_aboutself"
      required
      type="text"
      name="inputAboutself"
      placeholder="О себе"
      minLength={2}
      maxLength={200}
      onChange={handleDescriptionChange}
      value={description || ""}
    />
    <span className="popup__error popup__error_type_aboutself-input-error" id="aboutself-input-error"></span>
  </PopupWithForm>
}

export default EditProfilePopup;