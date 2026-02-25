import { enableValidation, settings, resetValidation } from "./validation.js";
import Api from "../utils/Api.js";

// --- API Configuration - Set up base URL and authorization headers ---

const api = new Api({
  baseURL: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "42653429-b780-4275-bd48-60509b9a4558",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });

    profileNameEl.textContent = userInfo.name;
    profileDescriptionEl.textContent = userInfo.about;

    const profileAvatarEl = document.querySelector(
      ".profile__avatar-container .profile__avatar",
    );
    if (profileAvatarEl && userInfo.avatar) {
      profileAvatarEl.src = userInfo.avatar;
      profileAvatarEl.alt = userInfo.name;
    }
  })
  .catch(console.error);

function renderLoading(button, isLoading, defaultText) {
  if (!button) return;
  button.textContent = isLoading ? "Saving..." : defaultText;
}

function renderDeleting(button, isLoading, defaultText) {
  if (!button) return;
  button.textContent = isLoading ? "Deleting..." : defaultText;
}

/* PROFILE (display elements) */
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

/* MODAL UTILITIES (shared) */
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");
    if (openedModal) closeModal(openedModal);
  }
}

function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscClose);
  modal.addEventListener("mousedown", handleOverlayClick);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscClose);
  modal.removeEventListener("mousedown", handleOverlayClick);
}

/* PREVIEW MODAL */
const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewImageEl = previewModal.querySelector(".modal__image");
const captionElement = previewModal.querySelector(".modal__caption");

previewModalCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

/* CARDS (template + rendering) */
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const cardsList = document.querySelector(".cards__list");

/* DELETE CARD CONFIRM MODAL */
const deleteModal = document.querySelector("#delete-card-modal");
const deleteCloseBtn = deleteModal.querySelector(".modal__close-btn");
const deleteCancelBtn = deleteModal.querySelector(".modal__btn-cancel");
const deleteConfirmBtn = deleteModal.querySelector(".modal__btn-delete");

let selectedCard = null;
let selectedCardId = null;

deleteCloseBtn.addEventListener("click", () => closeModal(deleteModal));
deleteCancelBtn.addEventListener("click", () => closeModal(deleteModal));

deleteConfirmBtn.addEventListener("click", (evt) => {
  evt.preventDefault();

  if (!selectedCard || !selectedCardId) return;

  renderDeleting(deleteConfirmBtn, true, "Delete");

  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      selectedCard = null;
      selectedCardId = null;
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      renderDeleting(deleteConfirmBtn, false, "Delete");
    });
});

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  const cardLikeBtnEl = cardElement.querySelector(".card__like-btn");

  if (data.isLiked) {
    cardLikeBtnEl.classList.add("card__like-btn_active");
  } else {
    cardLikeBtnEl.classList.remove("card__like-btn_active");
  }

  cardLikeBtnEl.addEventListener("click", () => {
    const isLiked = cardLikeBtnEl.classList.contains("card__like-btn_active");
    const request = isLiked ? api.removeLike(data._id) : api.addLike(data._id);

    request
      .then((updatedCard) => {
        cardLikeBtnEl.classList.toggle(
          "card__like-btn_active",
          updatedCard.isLiked,
        );
      })
      .catch(console.error);
  });

  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-btn");
  cardDeleteBtnEl.addEventListener("click", () => {
    selectedCard = cardElement;
    selectedCardId = data._id;
    openModal(deleteModal);
  });

  cardImageEl.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    captionElement.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

/* EDIT AVATAR */
const editAvatarBtn = document.querySelector(".profile__avatar-btn");
const editAvatarModal = document.querySelector("#edit-avatar-modal");
const editAvatarCloseBtn = editAvatarModal.querySelector(".modal__close-btn");

const editAvatarForm = editAvatarModal.querySelector(".modal__form");
const editAvatarSubmitBtn = editAvatarForm.querySelector(".modal__submit-btn");
const editAvatarInput = editAvatarModal.querySelector("#avatar-url-input");
const profileAvatarEl = document.querySelector(".profile__avatar");

editAvatarBtn.addEventListener("click", () => {
  resetValidation(editAvatarForm, settings);
  openModal(editAvatarModal);
});

editAvatarCloseBtn.addEventListener("click", () => {
  closeModal(editAvatarModal);
});

function handleAvatarSubmit(evt) {
  evt.preventDefault();

  renderLoading(editAvatarSubmitBtn, true, "Save");

  api
    .editAvatarInfo(editAvatarInput.value)
    .then((userInfo) => {
      profileAvatarEl.src = userInfo.avatar;
      closeModal(editAvatarModal);
      editAvatarForm.reset();
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(editAvatarSubmitBtn, false, "Save");
    });
}

editAvatarForm.addEventListener("submit", handleAvatarSubmit);

/* EDIT PROFILE (modal + form) */
const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");

const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileSubmitBtn =
  editProfileForm.querySelector(".modal__submit-btn");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input",
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input",
);

editProfileBtn.addEventListener("click", () => {
  editProfileNameInput.value = profileNameEl.textContent.trim();
  editProfileDescriptionInput.value = profileDescriptionEl.textContent.trim();

  resetValidation(editProfileForm, settings);
  openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", () => {
  closeModal(editProfileModal);
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();

  renderLoading(editProfileSubmitBtn, true, "Save");

  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((userInfo) => {
      profileNameEl.textContent = userInfo.name;
      profileDescriptionEl.textContent = userInfo.about;
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(editProfileSubmitBtn, false, "Save");
    });
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

/* NEW POST (modal + form) */
const newPostBtn = document.querySelector(".profile__post-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

const newPostForm = newPostModal.querySelector(".modal__form");
const newPostSubmitBtn = newPostForm.querySelector(".modal__submit-btn");
const newPostCardImageInput = newPostModal.querySelector("#card-image-input");
const newPostCardCaptionInput = newPostModal.querySelector(
  "#card-caption-input",
);

newPostBtn.addEventListener("click", () => {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", () => {
  closeModal(newPostModal);
});

function handleNewPostSubmit(evt) {
  evt.preventDefault();

  renderLoading(newPostSubmitBtn, true, "Save");

  api
    .addCard({
      name: newPostCardCaptionInput.value,
      link: newPostCardImageInput.value,
    })
    .then((newCardData) => {
      const newCardEl = getCardElement(newCardData);
      cardsList.prepend(newCardEl);

      newPostForm.reset();
      resetValidation(newPostForm, settings);
      closeModal(newPostModal);
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(newPostSubmitBtn, false, "Save");
    });
}

newPostForm.addEventListener("submit", handleNewPostSubmit);

/* VALIDATION */
enableValidation(settings);
