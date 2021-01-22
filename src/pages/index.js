import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupConfirm from "../components/PopupConfirm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js"
import Api from "../components/Api.js"

let userId = "";

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const formName = document.querySelector(".popup__input_profile-name");
const formActivity = document.querySelector(".popup__input_profile-activity");
const profileTitle = document.querySelector(".profile__name");
const profileActivity = document.querySelector(".profile__activity");
const profileEditAvatar = document.querySelector(".profile__avatar-container");

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inputInvalidClass: 'popup__input_state_invalid',
    buttonInvalidClass: 'popup__save_invalid',
};
const editFormValidator = new FormValidator(validationConfig,document.querySelector(".popup__form_edit"));
editFormValidator.enableValidation();
const addFormValidator = new FormValidator(validationConfig,document.querySelector(".popup__form_add"));
addFormValidator.enableValidation();
const editAvatarFormValidator = new FormValidator(validationConfig,document.querySelector(".popup__form_edit-avatar"));
editAvatarFormValidator.enableValidation();

const popupWithImage = new PopupWithImage(".popup_photo", ".popup__photo", ".popup__photo-title");
popupWithImage.setEventListeners();

const handleAddFormSubmit =(item) => {
    document.querySelector(".popup__form_add").querySelector('.popup__save').textContent="Сохранение";
    api.addCard(item.name,item.link)
        .then((res)=>{
            item._id=res._id;
            item.createdAt=res.createdAt;
            item.likes=res.likes;
            item.owner=res.owner;
            const cardElement = createCard(item);
            section.addItem(cardElement);
        })
        .catch((err)=> console.log(err))
        .finally(()=> {
            document.querySelector(".popup__form_add").querySelector('.popup__save').textContent="Сохранить";
        })

}
const handleEditFormSubmit =(item) => {
    document.querySelector(".popup_edit").querySelector('.popup__save').textContent="Сохранение...";
    console.log(item)
        api.editUserInfo(item["profile-name"], item["profile-activity"])
            .then(()=>{
                userInfo.setUserInfo(item["profile-name"],
                    item["profile-activity"]);
            })
            .catch((err)=>console.log(err))
            .finally(()=> {
                document.querySelector(".popup_edit").querySelector('.popup__save').textContent="Сохранить";
            })

}
const handleEditAvatar = (item)=>{
    console.log(item.link)
    document.querySelector(".popup_edit-avatar").querySelector('.popup__save').textContent="Сохранение...";
    api.editUserAvatar(item.link)
        .then(()=>{
            userInfo.setAvatar(item.link)
            popupEditAvatar.close()

        })
        .catch((err)=>console.log(err))
        .finally(()=> {
            document.querySelector(".popup__form_add").querySelector('.popup__save').textContent="Сохранить";
        })
}
const popupAddCard = new PopupWithForm(".popup_add", handleAddFormSubmit);
const popupEditProfile = new PopupWithForm(".popup_edit", handleEditFormSubmit);
const popupEditAvatar = new PopupWithForm(".popup_edit-avatar",handleEditAvatar);
const popupConfirmDelete = new PopupConfirm(".popup_card-delete");
popupConfirmDelete.setEventListeners();
popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();
popupEditAvatar.setEventListeners();

const userInfo = new UserInfo({
    name: profileTitle,
    description: profileActivity
  })
function createCard(item) {
    const card = new Card(item, '.template-card', userId,{
      handleCardClick: () => {
        const data = {};
        data.src = item.link;
        data.textContent = item.name;
        popupWithImage.open(data);
      },
        handleLikeClick: (likeButton,id,isLiked)=>{
            if(isLiked){
                 api.unlikeCard(id)
                     .then((data)=>{
                        card.setLikes(data.likes)
                    })
            }
            else{
                api.likeCard(id)
                    .then((data)=>{
                        card.setLikes(data.likes)
                    })
            }
        
        },
        handleRemoveClick: (id)=>{
            popupConfirmDelete.setSubmitAction(()=> {
                api.deleteCard(id)
                    .then(() => {
                        card.remove(); //
                        popupConfirmDelete.close()
                    })
                    .catch((err)=>console.log(err))
            });
           popupConfirmDelete.open();
            }
        
        },
        )

    return card.createCard();
}
const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-19",
    headers: {
        authorization:'67c59bb5-8f98-4223-bf05-3f7ad3c02f70',
        'Content-Type': 'application/json'
    }
})
Promise.all([
    api.getUserInfo(),
    api.getInitialCards()
])
    .then((values)=>{
        userId = values[0]._id;
        userInfo.setUserInfo(values[0].name,values[0].about);
        userInfo.setAvatar(values[0].avatar)
        values[1].reverse();
        section.renderItems(values[1])

    })
    .catch((err)=>{
        console.log(err)
    })

const section = new Section({
    renderer: ((item) => {
        const cardElement = createCard(item);
        section.addItem(cardElement);
    })
  }, ".cards")

editButton.addEventListener("click", ()=>{
    const user = userInfo.getUserInfo();
    formName.value = user.name;
    formActivity.value = user.description;
    popupEditProfile.open()});

addButton.addEventListener("click", ()=>{
    popupAddCard.open();
} );
profileEditAvatar.addEventListener("click", ()=>{
    popupEditAvatar.open();
} );


