import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const inputNameRef = useRef();
  const inputLinkRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmitButton();
    props.onUpdateCard({
      name: inputNameRef.current.value,
      link: inputLinkRef.current.value
    })
  }

  useEffect(() => {
    inputNameRef.current.value = "";
    inputLinkRef.current.value = "";
  }, [props.isOpen]);

  return <PopupWithForm 
    title="Новое место" 
    name="add-element" 
    buttonName={props.renderLoading}
    isOpen={props.isOpen} 
    onClose={props.onClose}
    onSubmit={handleSubmit}
  >
    <input
      id="title-input"
      className="popup__form-item popup__form-item_input_title"
      required
      type="text"
      name="inputitle"
      placeholder="Название"
      minLength={2}
      maxLength={30}
      ref={inputNameRef}
    />
    <span className="popup__error popup__error_type_title-input-error" id="title-input-error"></span>
    <input
      id="link-input"
      className="popup__form-item
      popup__form-item_input_link-picture"
      required
      type="url"
      name="inputLinkPicture"
      placeholder="Ссылка на картинку"
      ref={inputLinkRef}
    />
    <span className="popup__error popup__error_type_link-input-error" id="link-input-error"></span>
  </PopupWithForm>
}

export default AddPlacePopup;