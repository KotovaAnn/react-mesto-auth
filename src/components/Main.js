import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import editProfile from '../images/editProfile.svg';
import Card from './Card';

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__left-block-profile">
          <div className="profile__edit-avatar" onClick={props.onEditAvatar}>
            <img src={editProfile} alt="Иконка редактировать" />
          </div>
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватар профиля" />
          <div className="profile__info">
            <div className="profile__info-block">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button className="button profile__edit-button" type="button" onClick={props.onEditProfile} />
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>

        <button className="button profile__add-button" type="button" onClick={props.onAddPlace} />
      </section>
      console.log(props.card);
      <section className="elements">
        <ul className="elements__group-elements">
          {
            props.cards.map((item) => {      
              return (          
                <Card 
                  onCardClick={props.onCardClick} 
                  card={item} key={item._id}
                  onCardLike={props.onCardLike} 
                  onCardDelete={props.onCardDelete}
                />           
              )
            })
          }
        </ul>
      </section>

    </main>
  );
}
  
export default Main;