
export default class Card{
    constructor(data,selector,userId, {handleCardClick,handleLikeClick,handleRemoveClick}){
        this._name=data.name;
        this._link=data.link;
        this._ownerId = data.owner._id;
        this._likes = data.likes;
        this._cardId = data._id;
        this._selector = selector;
        this._userId = userId;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleRemoveClick = handleRemoveClick;

    }
    _getTemplate(){
        return document.querySelector(this._selector).content.children[0].cloneNode(true)
    }
    _isLiked() {
        let isLiked = false;
        this._likes.forEach((data) => {
            if (data._id === this._userId) {
                isLiked = true;
            }
        });
        return isLiked;
    }
    _setEventListeners(card){
        const likeButton = card.querySelector(".card__like");
        const delButton = card.querySelector(".card__delete");
        const photo = card.querySelector(".card__photo");
        
        photo.addEventListener("click",()=>{

            this._handleCardClick(this._name,this._link);
        
        });
        likeButton.addEventListener("click",()=>{
            let isLiked = this._isLiked();
            this._handleLikeClick(likeButton, this._cardId,isLiked);
        });
        delButton.addEventListener("click",()=>{
            
            this._handleRemoveClick(this._cardId);
        });

    }
    createCard(){
        this._card= this._getTemplate();
        const photo = this._card.querySelector(".card__photo");
        this._likesCounter = this._card.querySelector('.card__like-counter');
        this._likeIcon = this._card.querySelector(".card__like");
        this._deleteIcon = this._card.querySelector('.card__delete');

        photo.src=this._link;
        photo.alt=this._name;
        this._card.querySelector(".card__title").textContent=this._name;
        this._setEventListeners(this._card);
        this.setLikes(this._likes);
        if (this._ownerId !== this._userId) {
            this._deleteIcon.remove();
        }
        return this._card;
    }


    setLikes(likes){
        this._likesCounter.textContent = likes.length;
        this._likes = likes;
         if (Object.values(likes).some(like => like._id === this._userId)) {
             this._likeIcon.classList.add('card__like_liked');
         } else {
             this._likeIcon.classList.remove('card__like_liked');
         }



    }

    remove(){
        this._card.remove();
        this._card = null;
    }
}
