// Declaring a configuration object that contains the
// necessary classes and selectors.
export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_type_error",
  inputErrorClass: "modal__input_type_error",
};

const showInputError = (formEl, inputEl, errorMsg, settings) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = errorMsg;
  inputEl.classList.add(settings.inputErrorClass);
};

const hideInputError = (formEl, inputEl, settings) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = "";
  inputEl.classList.remove(settings.inputErrorClass);
};

const checkInputValidity = (formEl, inputEl, settings) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, settings);
  } else {
    hideInputError(formEl, inputEl, settings);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => !input.validity.valid);
};

const toggleButtonState = (inputList, buttonEl, settings) => {
  const isInvalid = hasInvalidInput(inputList);

  buttonEl.disabled = isInvalid;

  if (isInvalid) {
    buttonEl.classList.add(settings.inactiveButtonClass);
  } else {
    buttonEl.classList.remove(settings.inactiveButtonClass);
  }
};

export const resetValidation = (formEl, settings) => {
  const inputList = Array.from(formEl.querySelectorAll(settings.inputSelector));
  const buttonEl = formEl.querySelector(settings.submitButtonSelector);

  inputList.forEach((inputEl) => {
    hideInputError(formEl, inputEl, settings);
  });

  toggleButtonState(inputList, buttonEl, settings);
};

const setEventListeners = (formEl, settings) => {
  const inputList = Array.from(formEl.querySelectorAll(settings.inputSelector));
  const buttonEl = formEl.querySelector(settings.submitButtonSelector);

  toggleButtonState(inputList, buttonEl, settings);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl, settings);
      toggleButtonState(inputList, buttonEl, settings);
    });
  });
};

export const enableValidation = (settings) => {
  const formList = document.querySelectorAll(settings.formSelector);
  formList.forEach((formEl) => setEventListeners(formEl, settings));
};
