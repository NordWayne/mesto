const popup = document.querySelector(".popup");
const editButton = document.querySelector(".profile__edit-button");
const popupCloseButton = document.querySelector(".popup__close");
const form = document.querySelector(".popup__form");
const formName = document.querySelector(".popup__input_type_name");
const formActivity = document.querySelector(".popup__input_type_activity");
const profileTitle = document.querySelector(".profile__name");
const profileActivity = document.querySelector(".profile__activity");
function showPopup(){
    popup.classList.add("popup_opened");
    formName.value = profileTitle.textContent;
    formActivity.value = profileActivity.textContent;
}
function closePopup(){
    popup.classList.remove("popup_opened");
}
function submitForm(e){
    e.preventDefault();
    console.log(1);
    profileTitle.textContent =formName.value;
    profileActivity.textContent =formActivity.value;
    popup.classList.remove("popup_opened");
}
popupCloseButton.addEventListener("click", closePopup);
editButton.addEventListener("click", showPopup);
form.addEventListener("submit", submitForm);
