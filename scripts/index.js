// Buttons & Modals
const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");

const newPostBtn = document.querySelector(".profile__post-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

// Forms & Inputs
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

const newPostForm = newPostModal.querySelector(".modal__form");
const newPostCardImageInput = newPostModal.querySelector("#card-image-input");
const newPostCardCaptionInput = newPostModal.querySelector(
  "#card-caption-input"
);

// Profile
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

// --- Reusable Modal instead of repeating---
function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

// --- Edit Profile Modal Open ---
editProfileBtn.addEventListener("click", function () {
  // Trim removes hidden leading spaces/line breaks from profile text.
  // Without trim(), autofilled values looked shifted compared to the placeholder.
  editProfileNameInput.value = profileNameEl.textContent.trim();
  editProfileDescriptionInput.value = profileDescriptionEl.textContent.trim();
  openModal(editProfileModal);
});

// --- Edit Profile Modal Close ---
editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

// --- New Post Modal Open ---
newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

// --- New Post Modal Close ---
newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

// --- Edit Profile Submit ---
function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;
  closeModal(editProfileModal);
  console.log("submitting");
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

// --- New Post Submit ---
function handleNewPostSubmit(evt) {
  evt.preventDefault();
  closeModal(newPostModal);
  console.log(newPostCardImageInput.value, newPostCardCaptionInput.value);
}

newPostForm.addEventListener("submit", handleNewPostSubmit);
