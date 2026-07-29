import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;

    this._formElement =
      this._popupElement.querySelector(".modal__form");

    this._inputList = Array.from(
      this._formElement.querySelectorAll(".modal__input")
    );
  }

  _getInputValues() {
    const inputValues = {};

    this._inputList.forEach((inputElement) => {
      inputValues[inputElement.name] = inputElement.value;
    });

    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();

      const inputValues = this._getInputValues();

      this._handleFormSubmit(inputValues);
    });
  }
}