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




function showPopup(popupForm){
    popupForm.classList.add("popup_opened");
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
    }
    card.name =formCardName.value;
    card.link =formCardLink.value;
    addCard(card);
    formCardName.value=""; 
    formCardLink.value=""; 
    closePopup(popupAdd);
}
function createCard(element){
    const cardTemplate = document.querySelector(".template-card").content.cloneNode(true);
    const photo = cardTemplate.querySelector(".card__photo");
    cardTemplate.querySelector(".card__title").textContent = element.name;
    photo.src = element.link;
    photo.alt = "Фото "+ element.name;
    const likeButton = cardTemplate.querySelector(".card__like");
    const delButton = cardTemplate.querySelector(".card__delete");
    photo.addEventListener("click",()=>{
        showPopup(popupPhoto);
        document.addEventListener("keydown", keyChecker);       
        const img = popupPhoto.querySelector(".popup__photo");
        img.src=element.link;
        img.alt = "Фото " + element.name;
        popupPhoto.querySelector(".popup__photo-title").textContent=element.name;
        
    })
    likeButton.addEventListener("click",()=>{
        likeButton.classList.toggle("card__like_liked");
    })
    delButton.addEventListener("click",()=>{
        const card = delButton.closest(".card");
        card.remove();
    })
    return cardTemplate;
}
function addCard(element){
    const cardElement = createCard(element);
    cards.prepend(cardElement);
}
function keyChecker(evt){
    if (evt.code=="Escape"){
        closePopup(document.querySelector(".popup_opened"))
    }
}
initialCards.forEach(addCard);
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
