export default class FormValidator{
    constructor(config, form){
        this.config=config;
        this.form=form;
        this.submitButton = this.form.querySelector(this.config.submitButtonSelector);
        this._inputsList = this.form.querySelectorAll(this.config.inputSelector);
    }
    _showError(form, input, config) {
        const error = this.form.querySelector(`#${input.id}-error`);
        error.textContent = input.validationMessage;
        input.classList.add(this.config.inputInvalidClass);
    }

    _hideError(form, input) {
        const error = this.form.querySelector(`#${input.id}-error`);
        error.textContent = '';
        input.classList.remove(this.config.inputInvalidClass);
    }

    _checkInputValidity(form, input, config) {
        
        if (!input.validity.valid) {
            this._showError(form, input, config);
        } else {
            this._hideError(form, input, config);
        }
    }

    setButtonState(button, isActive, config) {
        if (isActive) {
            button.classList.remove(config.buttonInvalidClass);
            button.disabled = false;
        } else {
            button.classList.add(config.buttonInvalidClass);
            button.disabled = true;
        }
    }

    _setEventListeners() {

        this._inputsList.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(this.form, input, this.config);                  
                this.setButtonState(this.submitButton, this.form.checkValidity(), this.config);
            });
        });
    }
     enableValidation() {
            this._setEventListeners();
            this.setButtonState(this.submitButton, this.form.checkValidity(), this.config);
    }
     resetValidation() {
         this._inputsList.forEach((inputElement) => {
             this._hideError(this.form,inputElement)
        });

         this.setButtonState(this.submitButton,false,this.config);
     }


}
