export default class FormValidator{
    constructor(config, form){
        this.config=config;
        this.form=form;
        this.input = this.form.querySelector(config.inputSelector);
    }
    _showError(form, input, config) {
        const error = form.querySelector(`#${input.id}-error`);
        error.textContent = input.validationMessage;
        input.classList.add(config.inputInvalidClass);
    }

    _hideError(form, input, config) {
        const error = form.querySelector(`#${input.id}-error`);
        error.textContent = '';
        input.classList.remove(config.inputInvalidClass);
    }

    _checkInputValidity(form, input, config) {
        
        if (!input.validity.valid) {
            this._showError(form, input, config);
        } else {
            this._hideError(form, input, config);
        }
    }

    _setButtonState(button, isActive, config) {
        if (isActive) {
            button.classList.remove(config.buttonInvalidClass);
            button.disabled = false;
        } else {
            button.classList.add(config.buttonInvalidClass);
            button.disabled = true;
        }
    }

    _setEventListeners() {   
        const inputsList = this.form.querySelectorAll(this.config.inputSelector);
        const submitButton = this.form.querySelector(this.config.submitButtonSelector);
        inputsList.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(this.form, input, this.config);                  
                this._setButtonState(submitButton, this.form.checkValidity(), this.config);
            });
        });
    }
     enableValidation() {
            this._setEventListeners();
            const submitButton = this.form.querySelector(this.config.submitButtonSelector);
            this._setButtonState(submitButton, this.form.checkValidity(), this.config);
    }


}
