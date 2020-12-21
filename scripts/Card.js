import keyChecker from "./index.js";
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
export default class Card{
    constructor(data,selector){
        this._text=data.name;
        this._image=data.link;
        this._selector = selector;
    }
    _getTemplate(){
        return document.querySelector(this._selector).content.children[0].cloneNode(true)
    }
    
    _openPopup(popup){
        popup.classList.add("popup_opened");
        document.addEventListener("keydown", keyChecker); 
    }
    _setEventListeners(card){
        const likeButton = card.querySelector(".card__like");
        const delButton = card.querySelector(".card__delete");
        const photo = card.querySelector(".card__photo");
        const popupPhoto = document.querySelector(".popup_photo");
        photo.addEventListener("click",()=>{
            this._openPopup(popupPhoto); 
            const img = popupPhoto.querySelector(".popup__photo");
            img.src=this._image;
            img.alt = "Фото " + this._text;
            popupPhoto.querySelector(".popup__photo-title").textContent=this._text;
        
        });
        likeButton.addEventListener("click",()=>{
            likeButton.classList.toggle("card__like_liked");
        });
        delButton.addEventListener("click",()=>{
            const card = delButton.closest(".card");
            card.remove();
        });

    }
    createCard(){
        this._card= this._getTemplate();
        this._card.querySelector(".card__photo").src=this._image;
        this._card.querySelector(".card__title").textContent=this._text;
        this._setEventListeners(this._card);
        return this._card;
    }
}
initialCards.forEach((item)=>{
    const card = new Card(item,".template-card")
    const cardElement = card.createCard();
    const cards=document.querySelector(".cards");
    cards.prepend(cardElement)
});