import keyChecker from "./index.js";
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
        const photo = this._card.querySelector(".card__photo");
        photo.src=this._image;
        photo.alt=this._text;
        this._card.querySelector(".card__title").textContent=this._text;
        this._setEventListeners(this._card);
        return this._card;
    }
}
