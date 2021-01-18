import "../pages/index.css";
import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js"

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const formName = document.querySelector(".popup__input_profile-name");
const formActivity = document.querySelector(".popup__input_profile-activity");
const profileTitle = document.querySelector(".profile__name");
const profileActivity = document.querySelector(".profile__activity");

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

const popupWithImage = new PopupWithImage(".popup_photo", ".popup__photo", ".popup__photo-title");
popupWithImage.setEventListeners();

const handleAddFormSubmit =(item) => {
    const cardElement = createCard(item);
    section.addItem(cardElement);
}
const handleEditFormSubmit =(item) => {
    userInfo.setUserInfo(item["profile-name"],
        item["profile-activity"]);
}
const popupAddCard = new PopupWithForm(".popup_add", handleAddFormSubmit);
const popupEditProfile = new PopupWithForm(".popup_edit", handleEditFormSubmit);
popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();

const userInfo = new UserInfo({
    name: profileTitle,
    description: profileActivity
  })
  function createCard(item) {
    return new Card(item, '.template-card', {
      handleCardClick: () => {
        const data = {};
        data.src = item.link;
        data.textContent = item.name;
        popupWithImage.open(data);
      }
    }).createCard();
  }
const section = new Section({
    items: initialCards, 
    renderer: ((item) => {
        const cardElement = createCard(item);
        section.addItem(cardElement);
    })
  }, ".cards")
section.renderItems();

editButton.addEventListener("click", ()=>{
    const user = userInfo.getUserInfo();
    formName.value = user.name;
    formActivity.value = user.description;
    popupEditProfile.open()});

addButton.addEventListener("click", ()=>{
    popupAddCard.open();
} );


