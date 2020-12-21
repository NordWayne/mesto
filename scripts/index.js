import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
const popup = document.querySelector(".popup");
const popupList = document.querySelectorAll(".popup");
const popupAdd = document.querySelector(".popup_add");
const popupEdit = document.querySelector(".popup_edit");
const popupPhoto = document.querySelector(".popup_photo");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button")
const popupCloseEditButton = document.querySelector(".popup__close_edit");
const popupCloseAddButton = document.querySelector(".popup__close_add");
const popupClosePhotoButton = document.querySelector(".popup__close_photo");
const formEdit = document.querySelector(".popup_edit");
const formAdd = document.querySelector(".popup_add");
const formName = document.querySelector(".popup__input_profile-name");
const formActivity = document.querySelector(".popup__input_profile-activity");
const formCardName = document.querySelector(".popup__input_card-name");
const formCardLink = document.querySelector(".popup__input_card-link");
const profileTitle = document.querySelector(".profile__name");
const profileActivity = document.querySelector(".profile__activity");
const cards=document.querySelector(".cards");
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


function showPopup(popupForm){
    popupForm.classList.add("popup_opened");
    document.addEventListener("keydown", keyChecker); 
}

function closePopup(e){
    e.classList.remove("popup_opened");
    document.removeEventListener("keydown", keyChecker); 
}
function submitFormEdit(e){
    e.preventDefault();
    profileTitle.textContent =formName.value;
    profileActivity.textContent =formActivity.value;
    closePopup(popup);
}
function submitFormAdd(e){
    e.preventDefault();
    const card ={
        name: formCardName.value,
        link: formCardLink.value
    };
    const newCard = new Card(card,".template-card");
    generateCard(newCard);
    formCardName.value=""; 
    formCardLink.value="";
    closePopup(popupAdd);
    addFormValidator._setButtonState(formAdd.querySelector(".popup__save"), false, validationConfig)
}

function generateCard(element){
        const card = element.createCard();   
        cards.prepend(card);
}

export default function keyChecker(evt){
    if (evt.code=="Escape"){
        closePopup(document.querySelector(".popup_opened"))
    }
}
popupCloseAddButton.addEventListener("click",()=>closePopup(popupAdd));
popupCloseEditButton.addEventListener("click",()=>closePopup(popupEdit));
popupClosePhotoButton.addEventListener("click",()=>closePopup(popupPhoto));
popupList.forEach((popupEl)=>{
    popupEl.addEventListener("click",(evt)=>{
        if (evt.target.classList.contains("popup")){
                           
            closePopup(evt.target)
        }
    });
})

editButton.addEventListener("click", ()=>{
    formName.value = profileTitle.textContent;
    formActivity.value = profileActivity.textContent;
    showPopup(popupEdit)});
addButton.addEventListener("click", ()=>showPopup(popupAdd));
formEdit.addEventListener("submit", submitFormEdit);
formAdd.addEventListener("submit", submitFormAdd);
