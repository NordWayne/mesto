import Popup from "./Popup.js";
export default class PopupWithImage extends Popup{
    constructor(popupSelector,imageSelector, titleSelector){
        super(popupSelector);
        this._imageTitle= this._popup.querySelector(titleSelector);       
        this._image = this._popup.querySelector(imageSelector);
    
    }
    open (data){
        console.log(data)
        this._imageTitle.textContent = data.textContent;
        this._image.alt = data.textContent;
        this._image.src = data.src;      
        super.open();
    }

}