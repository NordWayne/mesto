export default class Popup{
    constructor(popupSelector){
        this._popup = document.querySelector(popupSelector);
        this._closeButton = this._popup.querySelector(".popup__close");
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOverlayClose = this._handleOverlayClose.bind(this);
    }
    setEventListeners(){
        this._closeButton.addEventListener('click', () => {
            this.close();
          })
    }
    open(){
        this._popup.classList.add("popup_opened");
        document.addEventListener("keydown", this._handleEscClose);
        document.addEventListener('click', this._handleOverlayClose); 
    }
    close(){
        this._popup.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleEscClose);
        document.removeEventListener('click', this._handleOverlayClose); 
    }
    _handleEscClose(evt){
        if (evt.keyCode === "Escape") {
            this.close();
          }
    }
    _handleOverlayClose(evt) {
        if (evt.target !== this._popup) return;
        this.close(); 
    }


}