import "core-js/stable";
import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import {
  initialCards,
  validationConfig,
} from "../utils/constants.js";

// Elements
const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

const profileEditForm = document.querySelector(
  "#profile-edit-modal .modal__form"
);

const addCardForm = document.querySelector(
  "#add-card-modal .modal__form"
);

const profileNameInput = document.querySelector("#profile-title-input");
const profileJobInput = document.querySelector(
  "#profile-description-input"
);

// User information
const userInfo = new UserInfo({
  nameSelector: "#profile-title",
  jobSelector: "#profile-description",
});

// Image popup
const imagePopup = new PopupWithImage("#preview-image-modal");

imagePopup.setEventListeners();

// Card creation
function createCard(data) {
  const card = new Card(
    data,
    "#card-template",
    (name, link) => {
      imagePopup.open({
        name,
        link,
      });
    }
  );

  return card.generateCard();
}

const cardListSection = new Section(
  {
    items: initialCards,

    renderer: (item) => {
      const cardElement = createCard(item);
      cardListSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscClose);
}

// Cards section
const cardListSection = new Section(
  {
    items: initialCards,

    renderer: (item) => {
      const cardElement = createCard(item);
      cardListSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

// Edit profile popup
const profilePopup = new PopupWithForm(
  "#profile-edit-modal",
  (formData) => {
    userInfo.setUserInfo({
      name: formData.title,
      job: formData.description,
    });

    profilePopup.close();
  }
);

// Add card popup
const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  (formData) => {
    const cardElement = createCard({
      name: formData.title,
      link: formData.link,
    });

    cardListSection.addItem(cardElement);
    addCardPopup.close();
  }
);

profilePopup.setEventListeners();
addCardPopup.setEventListeners();

// Form validation
const profileFormValidator = new FormValidator(
  validationConfig,
  profileEditForm
);

const addCardFormValidator = new FormValidator(
  validationConfig,
  addCardForm
);

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

// Buttons
profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();

  profileNameInput.value = currentUserInfo.name;
  profileJobInput.value = currentUserInfo.job;

  profileFormValidator.resetValidation();
  profilePopup.open();
});

addCardButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  addCardPopup.open();
});

// Render initial cards once
cardListSection.renderItems();