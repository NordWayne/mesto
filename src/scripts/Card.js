
export default class Card{
    constructor(data,selector, {handleCardClick}){ 
        this._name=data.name;
        this._link=data.link;
        this._selector = selector;
        this._handleCardClick = handleCardClick;
    }
    _getTemplate(){
        
        return document.querySelector(this._selector).content.children[0].cloneNode(true)
    }
    
    _setEventListeners(card){
        const likeButton = card.querySelector(".card__like");
        const delButton = card.querySelector(".card__delete");
        const photo = card.querySelector(".card__photo");
        
        photo.addEventListener("click",()=>{
            this._handleCardClick(this._name,this._link);
        
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
        photo.src=this._link;
        photo.alt=this._name;
        this._card.querySelector(".card__title").textContent=this._name;
        this._setEventListeners(this._card);
        return this._card;
    }
}
