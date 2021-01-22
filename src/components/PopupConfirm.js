import Popup from "./Popup.js";
export default class PopupConfirm extends Popup{
    constructor(popupSelector){
        super(popupSelector);
        this._popup = document.querySelector(popupSelector);
        this._popupForm = this._popup.querySelector('.popup__form');

    }
    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (e) => {
            this._handleSubmit();
            e.preventDefault();
            this.close();
        });

    }
    setSubmitAction(submitAction){
        this._handleSubmit = submitAction;
    }
}