import Popup from "./Popup.js";
export default class PopupWithForm extends Popup{
    constructor(popupSelector,handleSubmit){
       super(popupSelector);
       this._handleSubmit = handleSubmit;    
       this._popupForm = this._popup.querySelector('.popup__form');
       this._popupSubmitButton = this._popupForm.querySelector('.popup__save');
    }
    _getInputValues(){
        this._inputList=this._popupForm.querySelectorAll(".popup__input");
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
          });
        
        return this._formValues;
    
    }
    setEventListeners(){
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this._popupSubmitButton.textContent="Сохранение";
            this._handleSubmit(this._getInputValues());
            this.close();
          });
    }
    close() {
        this._popupForm.reset();
        super.close();
      }
    
}