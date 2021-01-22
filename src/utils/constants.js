const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const formName = document.querySelector(".popup__input_profile-name");
const formActivity = document.querySelector(".popup__input_profile-activity");
const profileTitle = document.querySelector(".profile__name");
const profileActivity = document.querySelector(".profile__activity");
const profileEditAvatar = document.querySelector(".profile__avatar-container");
const profileAvatar =document.querySelector(".profile__avatar");
const popupFormAdd = document.querySelector(".popup__form_add")
const popupFormEdit =document.querySelector(".popup_edit");
const popupFormEditAvatar = document.querySelector(".popup_edit-avatar");

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inputInvalidClass: 'popup__input_state_invalid',
    buttonInvalidClass: 'popup__save_invalid',
};
export {editButton,addButton,formName,formActivity,profileTitle,profileActivity, profileEditAvatar,profileAvatar,popupFormAdd,popupFormEdit,popupFormEditAvatar,validationConfig};
