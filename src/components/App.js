import { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import Footer from './Footer';
import { api } from '../utils/api';
import RenderLoading from '../utils/utils';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopup, setImagePopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getInitialCards()
      .then(res => {
        setCards(res);
      })
      .catch(err => {
        console.log(err);
      });
      api.getInfoUser()
      .then(res => {
        setCurrentUser(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api.removeCard(card._id)
      .then((res) => {
        setCards((cards) => cards.filter(item => {
          if (item._id !== card._id) {
            return item;
          }
        }))
      })
      .catch(err => {
        console.log(err);
      });
  };

  function onSubmitButton() {
    setIsLoading(true);
  }

  function handleUpdateUser(inputValues) {
    api.setUserInfo(inputValues)
     .then(res => {
      setCurrentUser(res);
      closeAllPopups();
      setIsLoading(false);
     })
     .catch(err => {
      console.log(err);
    });
  }

  function handleonUpdateAvatar(link) {
    api.editAvatar(link)
     .then(res => {
      setCurrentUser(res);
      closeAllPopups();
      setIsLoading(false);
     })
     .catch(err => {
      console.log(err);
    });
  }
  
  function handleUpdateCard(inputValues) {
    
    api.addNewCard(inputValues)
    .then(newCard => {
      handleAddPlaceSubmit(newCard)
      closeAllPopups();
      setIsLoading(false);
    })
    .catch(err => {
      console.log(err);
    });
  }

  function handleAddPlaceSubmit(newCard) {
    setCards([newCard, ...cards]); 
  }

  function handleCardClick(title, link) {
    setSelectedCard({title: title, link: link});
    setImagePopup(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setImagePopup(false);
    setSelectedCard({selectedCard: ""});
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main 
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser}
          onSubmitButton={onSubmitButton}
          renderLoading={RenderLoading(isLoading)}
        />

        <PopupWithForm 
          title="Вы уверены?" 
          name="delete-card" 
          buttonName="Да"
        />

        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleonUpdateAvatar}
          onSubmitButton={onSubmitButton}
          renderLoading={RenderLoading(isLoading)}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUpdateCard={handleUpdateCard}
          onSubmitButton={onSubmitButton}
          renderLoading={RenderLoading(isLoading)}
        />

        <ImagePopup card={selectedCard} isOpen={isImagePopup} onClose={closeAllPopups}/>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;