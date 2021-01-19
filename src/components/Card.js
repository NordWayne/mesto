
export default class Card{
    constructor(data,selector, {handleCardClick,handleLikeClick,handleRemoveClick}){ 
        this._name=data.name;
        this._link=data.link;
        this._selector = selector;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleRemoveClick = handleRemoveClick;
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
            this._handleLikeClick(likeButton); 
        });
        delButton.addEventListener("click",()=>{
            
            this._handleRemoveClick(delButton);
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
