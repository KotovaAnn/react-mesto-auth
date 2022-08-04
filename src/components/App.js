import { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Login from './Login.js';
import Register from './Register.js';
import Main from './Main';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import Footer from './Footer';
import { api } from '../utils/api';
import RenderLoading from '../utils/utils';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CurrentLoggedInContext } from '../contexts/CurrentLoggedInContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from './InfoTooltip';
import * as auth from '../auth.js';

function App() {
  const history = useHistory();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopup, setImagePopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [isInfotooltip, setIsInfotooltip] = useState(false);
  const [userEmail, setUserEmail] = useState("e-mail");

  useEffect(() => {
    handleTokenCheck();

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
    handleEsc();
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    handleEsc();
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    handleEsc();
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setImagePopup(false);
    setIsInfotooltip(false);
    setSelectedCard({selectedCard: ""});
  }

  function handleEsc() {
    document.addEventListener('keydown', (evt) => {
      if(evt.key === "Escape") {
        closeAllPopups();
      }
    });
  }

  function handleRegistration(email, password) {
    auth.register(email, password).then((res) => {   
      history.push('/sign-in');
      setRegistered(true);
      setIsInfotooltip(true);
      handleEsc();
    })
    .catch(err => {
      setRegistered(false);
      setIsInfotooltip(true);
    });
  }
  
  function handleLogin(email, password) {
    auth.authorize(email, password)
     .then((res) => { 
      setLoggedIn(true);
      history.push('/');
      localStorage.setItem('jwt', res.token);
    })
    .catch(err => {
      console.log(err);
      setRegistered(false);
      setIsInfotooltip(true);
      handleEsc();
    });
  }

  function handleTokenCheck() {
    if(localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt)
        .then((res) => {
          if(res) {
            setLoggedIn(true);
            history.push('/');
            setUserEmail(res.data.email);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  function signOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }

  return (
      <div className="page">
      <CurrentLoggedInContext.Provider value={loggedIn}>
        <CurrentUserContext.Provider value={currentUser}>
          <Header userEmail={userEmail} signOut={signOut} />
          <Switch>
            <Route path="/sign-in">
              <Login handleLogin={handleLogin} />
            </Route>
            <Route path="/sign-up">
              <Register handleRegistration={handleRegistration} />
            </Route>
            <ProtectedRoute
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
          </Switch>
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

          <ImagePopup card={selectedCard} isOpen={isImagePopup} onClose={closeAllPopups} handleEsc={handleEsc} />

          <InfoTooltip isOpen={isInfotooltip} onClose={closeAllPopups} registered={registered}/>
          
        </CurrentUserContext.Provider>
      </CurrentLoggedInContext.Provider>
      </div>
  );
}

export default App;