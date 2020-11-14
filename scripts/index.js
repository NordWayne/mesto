const popup = document.querySelector(".popup");
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



function showPopup(evt){
    console.log(evt.target);
    if(evt.target.classList.contains("profile__img-edit")){
        popupEdit.classList.add("popup_opened");
        formName.value = profileTitle.textContent;
        formActivity.value = profileActivity.textContent;
    }
    else if (evt.target.classList.contains("profile__add-button")){
        popupAdd.classList.add("popup_opened");
    }
    else{
        popupPhoto.classList.add("popup_opened");
    }
    console.log("opened");
}

function closePopup(e){
    console.log(1);
    e.classList.remove("popup_opened");  
}
function submitFormEdit(e){
    e.preventDefault();
    console.log(1);
    profileTitle.textContent =formName.value;
    profileActivity.textContent =formActivity.value;
    popup.classList.remove("popup_opened");
}
function submitFormAdd(e){
    e.preventDefault();
    console.log(1);
    const card ={
        name:"",
        link:""
    }
    card.name =formCardName.value;
    card.link =formCardLink.value;
    addCard(card);
    formCardName.value="";
    formCardLink.value="";
    popupAdd.classList.remove("popup_opened");
}
function createCard(element){
    const cardTemplate = document.querySelector(".template-card").content.cloneNode(true);
    cardTemplate.querySelector(".card__title").textContent = element.name;
    cardTemplate.querySelector(".card__photo").src = element.link;
    cardTemplate.querySelector(".card__photo").alt = "Фото "+ element.name;
    const photo = cardTemplate.querySelector(".card__photo");
    const likeButton = cardTemplate.querySelector(".card__like");
    const delButton = cardTemplate.querySelector(".card__delete");
    photo.addEventListener("click",()=>{
        popupPhoto.classList.add("popup_opened");
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
    cards.append(cardElement);
}
initialCards.forEach(addCard);
popupCloseAddButton.addEventListener("click",()=>closePopup(popupAdd));
popupCloseEditButton.addEventListener("click",()=>closePopup(popupEdit));
popupClosePhotoButton.addEventListener("click",()=>closePopup(popupPhoto));
editButton.addEventListener("click", showPopup);
addButton.addEventListener("click", showPopup);
formEdit.addEventListener("submit", submitFormEdit);
formAdd.addEventListener("submit", submitFormAdd);
