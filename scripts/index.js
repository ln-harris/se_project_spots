// --- Array of the cards ---
const initialCards = [
  {
    name: "Beach house",
    link: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1625&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Dunk contest",
    link: "https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "New Ferrari addition",
    link: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "A very long bridge, over the forest",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Cute dogs",
    link: "https://images.unsplash.com/photo-1504595403659-9088ce801e29?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Alaskan mountain view",
    link: "https://images.unsplash.com/photo-1574788901656-6a9ee34a3fa7?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

// --- Buttons & Modals ---
const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");

const newPostBtn = document.querySelector(".profile__post-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

// --- Forms & Inputs ---
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

// --- Profile ---
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

// --- Reusable Modal instead of repeating ---
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

// --- Looping the array of cards ---
initialCards.forEach(function (item) {
  console.log(item.name);
  console.log(item.link);
});
